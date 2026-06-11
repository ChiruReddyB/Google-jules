'use client';
import { useState, useEffect } from 'react';
import { chatService, documentService } from '@/services/api';

export function useChat(documentId?: number) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (content: string) => {
    setMessages(prev => [...prev, { role: 'user', content }]);
    setLoading(true);
    try {
      const response = await chatService.sendMessage(content, documentId);
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.answer, sources: response.data.sources }]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
}

export function useDocuments() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await documentService.getAll();
      setDocuments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return { documents, loading, refresh: fetchDocuments };
}
