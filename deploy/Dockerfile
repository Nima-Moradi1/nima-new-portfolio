# Match GitHub's Node version and glibc-based Linux build environment.
# No dependency installation or Next.js compilation happens on Liara.
FROM node:22.23.2-bookworm-slim@sha256:4d676821dff059fd00d277ee4261ef34ea712317fed0737c03941481b5760c96
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 HOSTNAME=0.0.0.0 PORT=3000
ADD --chown=node:node runtime.tar.gz /app/
USER node
EXPOSE 3000
CMD ["node", "server.js"]
