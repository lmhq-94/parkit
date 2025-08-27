import { Request, Response, NextFunction } from 'express';
import { AnyZodSchema, ZodError } from 'zod';
import { ValidationError } from '@parkit/types/errors';

export const validateRequest = (schema: AnyZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = new ValidationError(
          'Error de validación',
          error.errors.reduce((acc, err) => {
            const field = err.path.join('.');
            acc[field] = err.message;
            return acc;
          }, {} as Record<string, string>)
        );
        
        res.status(400).json({
          success: false,
          message: validationError.message,
          code: validationError.code,
          details: validationError.details
        });
        return;
      }
      next(error);
    }
  };
};

export const validateBody = (schema: AnyZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = new ValidationError(
          'Error de validación en el cuerpo de la petición',
          error.errors.reduce((acc, err) => {
            const field = err.path.join('.');
            acc[field] = err.message;
            return acc;
          }, {} as Record<string, string>)
        );
        
        res.status(400).json({
          success: false,
          message: validationError.message,
          code: validationError.code,
          details: validationError.details
        });
        return;
      }
      next(error);
    }
  };
};

export const validateQuery = (schema: AnyZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = await schema.parseAsync(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = new ValidationError(
          'Error de validación en los parámetros de consulta',
          error.errors.reduce((acc, err) => {
            const field = err.path.join('.');
            acc[field] = err.message;
            return acc;
          }, {} as Record<string, string>)
        );
        
        res.status(400).json({
          success: false,
          message: validationError.message,
          code: validationError.code,
          details: validationError.details
        });
        return;
      }
      next(error);
    }
  };
};

export const validateParams = (schema: AnyZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = await schema.parseAsync(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = new ValidationError(
          'Error de validación en los parámetros de la URL',
          error.errors.reduce((acc, err) => {
            const field = err.path.join('.');
            acc[field] = err.message;
            return acc;
          }, {} as Record<string, string>)
        );
        
        res.status(400).json({
          success: false,
          message: validationError.message,
          code: validationError.code,
          details: validationError.details
        });
        return;
      }
      next(error);
    }
  };
}; 