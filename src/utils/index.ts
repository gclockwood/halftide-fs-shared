import { RAW_FILE_EXTENSIONS, JPEG_EXTENSIONS, TIFF_EXTENSIONS, VIDEO_EXTENSIONS, XMP_EXTENSIONS, FileType } from '../constants';

/**
 * File type detection utilities
 */
export function getFileExtension(filename: string): string {
  return filename.toLowerCase().substring(filename.lastIndexOf('.'));
}

export function isRawFile(filename: string): boolean {
  const ext = getFileExtension(filename);
  return RAW_FILE_EXTENSIONS.includes(ext as any);
}

export function isJpegFile(filename: string): boolean {
  const ext = getFileExtension(filename);
  return JPEG_EXTENSIONS.includes(ext as any);
}

export function isTiffFile(filename: string): boolean {
  const ext = getFileExtension(filename);
  return TIFF_EXTENSIONS.includes(ext as any);
}

export function isVideoFile(filename: string): boolean {
  const ext = getFileExtension(filename);
  return VIDEO_EXTENSIONS.includes(ext as any);
}

export function isXmpFile(filename: string): boolean {
  const ext = getFileExtension(filename);
  return XMP_EXTENSIONS.includes(ext as any);
}

export function detectFileType(filename: string, mimeType?: string): FileType {
  if (isXmpFile(filename)) return FileType.xmp;
  if (isRawFile(filename)) return FileType.raw;
  if (isJpegFile(filename)) return FileType.jpeg;
  if (isTiffFile(filename)) return FileType.tiff;
  if (isVideoFile(filename)) return FileType.video;
  
  // Fallback to MIME type detection
  if (mimeType) {
    if (mimeType.startsWith('image/')) {
      if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return FileType.jpeg;
      if (mimeType.includes('tiff')) return FileType.tiff;
      if (mimeType.includes('raw') || mimeType.includes('x-')) return FileType.raw;
    }
    if (mimeType.startsWith('video/')) return FileType.video;
    if (mimeType.includes('xml') || mimeType.includes('rdf')) return FileType.xmp;
  }
  
  return FileType.other;
}

/**
 * XMP sidecar utilities
 */
export function getXmpSidecarFilename(originalFilename: string): string {
  const lastDot = originalFilename.lastIndexOf('.');
  if (lastDot === -1) {
    return originalFilename + '.xmp';
  }
  return originalFilename.substring(0, lastDot) + '.xmp';
}

export function isXmpSidecarFor(xmpFilename: string, originalFilename: string): boolean {
  return xmpFilename === getXmpSidecarFilename(originalFilename);
}

/**
 * File path utilities
 */
export function sanitizeFilename(filename: string): string {
  // Remove invalid characters and replace with underscores
  return filename.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').trim();
}

export function generateS3Key(userId: string, filename: string, fileId: string): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const sanitized = sanitizeFilename(filename);
  const ext = getFileExtension(sanitized);
  const basename = sanitized.substring(0, sanitized.lastIndexOf('.')) || sanitized;
  
  return `${userId}/${year}/${month}/${basename}_${fileId}${ext}`;
}

/**
 * Hash utilities
 */
export function generateFileHash(buffer: Buffer, algorithm: 'md5' | 'sha256' = 'sha256'): string {
  const crypto = require('crypto');
  return crypto.createHash(algorithm).update(buffer).digest('hex');
}

/**
 * Size formatting utilities
 */
export function formatFileSize(bytes: number | bigint): string {
  const size = typeof bytes === 'bigint' ? Number(bytes) : bytes;
  
  if (size === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  
  return parseFloat((size / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Date utilities
 */
export function formatDate(date: Date | string, format: 'short' | 'long' | 'iso' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case 'iso':
      return d.toISOString();
    case 'long':
      return d.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    case 'short':
    default:
      return d.toLocaleDateString('en-US');
  }
}

export function isValidDate(date: any): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Validation utilities
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUsername(username: string): boolean {
  // Username must be 3-30 characters, alphanumeric, underscores, hyphens
  const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;
  return usernameRegex.test(username);
}

export function isValidPassword(password: string): boolean {
  // Password must be at least 8 characters with at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
}

/**
 * Pagination utilities
 */
export function calculatePagination(page: number, limit: number, total: number) {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;
  
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext,
    hasPrev
  };
}

export function getPaginationOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}

/**
 * Error handling utilities
 */
export function createError(message: string, code?: string, statusCode?: number) {
  const error = new Error(message) as any;
  if (code) error.code = code;
  if (statusCode) error.statusCode = statusCode;
  return error;
}

export function isApiError(error: any): error is { message: string; code?: string; statusCode?: number } {
  return error && typeof error.message === 'string';
}

/**
 * Array utilities
 */
export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

/**
 * String utilities
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single
    .trim();
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

export function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Type guards
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}