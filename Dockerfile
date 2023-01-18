FROM denoland/deno:1.10.3

# The port that your application listens to.
EXPOSE 8100

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
# COPY deps.ts .
# RUN deno cache deps.ts

# Compile the main app so that it doesn't need to be compiled each startup/entry.
COPY server.js .
# RUN deno cache server.js

CMD ["run", "--allow-net", "server.js"]