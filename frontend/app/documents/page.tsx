'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileText, Upload, Trash2, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DocumentsPage() {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Documents</h1>
            <p className="text-slate-500">Manage and study your uploaded materials.</p>
          </div>
          <Button size="lg" className="h-14 px-8" onClick={() => setIsUploading(true)}>
            <Upload className="w-5 h-5 mr-2" /> Upload Document
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              placeholder="Search documents..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none"
            />
          </div>
          <Button variant="outline" className="h-12 px-6">
            <Filter className="w-5 h-5 mr-2" /> Filter
          </Button>
        </div>

        {/* Document Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="group relative overflow-hidden">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <FileText className="w-8 h-8" />
                  </div>
                  <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-lg font-bold mb-1 truncate">Deep_Learning_Lecture_0{i+1}.pdf</h3>
                <p className="text-sm text-slate-500 mb-6">Uploaded on Oct {10 + i}, 2023 • 5.8 MB</p>

                <div className="flex items-center space-x-3">
                  <Button size="sm" className="flex-1">Study Now</Button>
                  <Button size="sm" variant="outline">Summary</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Simple Upload Modal Mockup */}
      {isUploading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-xl p-12 text-center relative">
            <button
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              onClick={() => setIsUploading(false)}
            >
              ✕
            </button>
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <Upload className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Upload Study Materials</h2>
            <p className="text-slate-500 mb-8">
              Drag and drop your files here, or click to browse.<br />
              Supports PDF, DOCX, PPTX and TXT (Max 50MB).
            </p>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 mb-8 bg-slate-50 dark:bg-slate-900/50">
              <p className="text-slate-400 font-medium">Drop files here</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1" onClick={() => setIsUploading(false)}>Cancel</Button>
              <Button className="flex-1">Upload & Process</Button>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
