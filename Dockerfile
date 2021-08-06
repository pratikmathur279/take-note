FROM node:14
WORKDIR /var/app/
COPY package.json /var/app/package.json
RUN npm install

COPY . .

CMD ["npm","start"]

# FROM node:14 AS server-build
# WORKDIR /root/
# # COPY --from=ui-build /usr/src/app/client/build ./client/build
# COPY server/ ./server/
# COPY server/package*.json ./server/
# COPY server/.env ./server/

# RUN cd server && npm install
# COPY server/index.js ./server/

# EXPOSE 3000

# CMD ["node", "./server/index.js"]