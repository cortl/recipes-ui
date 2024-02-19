FROM node:20 as builder
WORKDIR /app

COPY package.json tsconfig.json package-lock.json /app/
RUN npm ci

COPY pages/ /app/pages
COPY public/ /app/public
COPY src/ /app/src
COPY styles/ /app/styles

RUN npm run build

##########
FROM builder as runner
WORKDIR /app

# Copy necessary files from builder stage
COPY --from=builder /app/package*.json ./ 
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

ENV NODE_ENV production
RUN npm ci --only=production

EXPOSE 8080

CMD ["npm", "start"]