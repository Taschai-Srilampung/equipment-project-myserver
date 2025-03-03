FROM node:18

WORKDIR /app

# คัดลอกไฟล์ dependency แล้วติดตั้ง
COPY package*.json ./
RUN npm install

# คัดลอก source code ทั้งหมด
COPY . .

# (ถ้าต้องการให้ vite ทำงานได้)
RUN chmod +x node_modules/.bin/vite

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
