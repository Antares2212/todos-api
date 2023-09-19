import { Request, Response } from 'express';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { CustomExceptionResponse, HttpExceptionResponse } from './http-exception-response.interface';

@Catch(HttpException)
export class AllExeptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string

    console.log(request);
    

    if(exception instanceof HttpException) {
      status = exception.getStatus()
      const errorResponse = exception.getResponse()
      errorMessage = (errorResponse as HttpExceptionResponse).error || exception.message
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR
      errorMessage = 'Критическая ошибка сервера'
    }

    const errorResponse = this.getErrorResponse(status, errorMessage, request)
    response.status(status).json(errorResponse)
  }

  private getErrorResponse = (status: HttpStatus, errorMessage: string, request: Request): CustomExceptionResponse => ({
    statusCode: status,
    error: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date()
  })
}