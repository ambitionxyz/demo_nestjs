# FROM node:18-alpine as build


# WORKDIR /app

# #Install @nestjs/cli
# RUN npm i -g @nestjs/cli

# #Install dependencies
# COPY package.json .
# RUN npm i

# #Build
# COPY . .
# RUN npm run build

# FROM node:18-alpine as production

# WORKDIR /app

# COPY --from=build /app/node_modules /app/node_modules
# COPY --from=build /app/dist /app/dist
# COPY --from=build /app/package.json /app/package.json

# EXPOSE 3000

# CMD [ "npm","run","start:prod" ]

FROM node:18-alpine as development

WORKDIR /app

# Install @nestjs/cli
RUN npm i -g @nestjs/cli

# Copy package.json and install dependencies
COPY package.json .
RUN npm i

# Copy source code
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

