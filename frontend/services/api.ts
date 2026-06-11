'use client';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
});

export const documentService = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData);
  },
  getAll: () => api.get('/documents'),
};

export const chatService = {
  sendMessage: (query: string, documentId?: number) =>
    api.post('/chat', null, { params: { query, document_id: documentId } }),
};

export const studyService = {
  generateQuiz: (documentId: number) => api.post(`/generate-quiz/${documentId}`),
  generateSummary: (documentId: number) => api.post(`/generate-summary/${documentId}`),
};
