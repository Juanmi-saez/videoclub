FROM dockerprivatehub-on.azurecr.io/argo_node10-alpine

ENV SERVER_PORT 3000
ENV LOCAL_HOME /usr/src/app

RUN mkdir -p ${LOCAL_HOME}
WORKDIR ${LOCAL_HOME}

COPY . ${LOCAL_HOME}

RUN addgroup -g 1217 -S iot && \
  adduser -u 1211 -D -G iot -h ${LOCAL_HOME} iot && \
  chown -R iot:iot ${LOCAL_HOME}

USER iot

HEALTHCHECK CMD curl -f http://localhost:${SERVER_PORT}/version || exit 1

ENV NODE_ENV production
ENV PYTHONUNBUFFERED 1

RUN npm run stage-dependencies

EXPOSE ${SERVER_PORT}

EXPOSE ${SERVER_PORT}

CMD [ "npm", "run", "serve" ]
