import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  phone: z.string().optional(),
  companyId: z.string().uuid('ID de empresa inválido').optional(),
  roleId: z.string().uuid('ID de rol inválido'),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Token de refresco requerido'),
});

export const resetPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Contraseña actual requerida'),
  newPassword: z.string().min(8, 'La nueva contraseña debe tener al menos 8 caracteres'),
  confirmPassword: z.string().min(1, 'Confirmar contraseña requerida'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>; 