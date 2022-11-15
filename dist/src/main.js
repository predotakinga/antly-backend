"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Ant.ly')
        .setDescription('The ant.ly API description')
        .setVersion('1.0')
        .addTag('ant.ly')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors();
    app.use(cookieParser());
    const port = process.env.PORT || 3000;
    await app.listen(port, () => console.log("listening on port 3000"));
}
bootstrap();
//# sourceMappingURL=main.js.map