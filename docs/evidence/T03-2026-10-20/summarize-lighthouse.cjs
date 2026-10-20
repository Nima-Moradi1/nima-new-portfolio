/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node CommonJS evidence utility. */
const fs = require('node:fs');
const path = require('node:path');
const rows = fs.readdirSync(__dirname).filter(n => n.endsWith('.report.json')).map(file => {
  const r = JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf8'));
  const audit = id => r.audits?.[id];
  const requests = audit('network-requests')?.details?.items || [];
  const resources = audit('resource-summary')?.details?.items || [];
  return {
    file, lighthouseVersion: r.lighthouseVersion, fetchTime: r.fetchTime,
    requestedUrl: r.requestedUrl, finalDisplayedUrl: r.finalDisplayedUrl,
    browser: r.environment?.hostUserAgent,
    benchmarkIndex: r.environment?.benchmarkIndex,
    settings: r.configSettings,
    scores: Object.fromEntries(Object.entries(r.categories || {}).map(([k,v]) => [k, v.score === null ? null : Math.round(v.score*100)])),
    metrics: Object.fromEntries(['first-contentful-paint','largest-contentful-paint','speed-index','total-blocking-time','cumulative-layout-shift','server-response-time','total-byte-weight'].map(id => [id, { value: audit(id)?.numericValue, unit: audit(id)?.numericUnit, displayed: audit(id)?.displayValue }])),
    resources,
    network: { count: requests.length, transferSize: requests.reduce((n,r)=>n+(r.transferSize||0),0), scriptTransferSize: requests.filter(r=>r.resourceType==='Script').reduce((n,r)=>n+(r.transferSize||0),0), scriptCount: requests.filter(r=>r.resourceType==='Script').length, failed: requests.filter(r=>r.failed || r.statusCode >= 400) },
    failedAudits: Object.entries(r.audits||{}).filter(([,a])=>a.score===0 || a.scoreDisplayMode==='error').map(([id,a])=>({id,title:a.title,description:a.description,displayValue:a.displayValue,score:a.score,error:a.errorMessage})),
    warnings: r.runWarnings, runtimeError: r.runtimeError,
  };
});
fs.writeFileSync(path.join(__dirname, 'metrics-summary.json'), JSON.stringify(rows,null,2));
console.log(JSON.stringify(rows.map(r=>({file:r.file,scores:r.scores,metrics:r.metrics,network:r.network,runtimeError:r.runtimeError?.code})),null,2));
