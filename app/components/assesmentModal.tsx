'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface RunAssessmentModalProps {
  open: boolean;
  onClose: () => void;
  onAnalyze: (files: { interactive: File | null; nonInteractive: File | null }) => void;
}

export function RunAssessmentModal({ open, onClose, onAnalyze }: RunAssessmentModalProps) {
  const [interactiveFile, setInteractiveFile] = useState<File | null>(null);
  const [nonInteractiveFile, setNonInteractiveFile] = useState<File | null>(null);

  const handleAnalyze = () => {
    if (interactiveFile) {
      onAnalyze({ interactive: interactiveFile, nonInteractive: nonInteractiveFile });
      onClose();
    } else {
      alert('Interactive Sign-ins file is required.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Run New Assessment</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="interactive">Interactive Sign-ins (Identity) *</Label>
            <Input
              id="interactive"
              type="file"
              accept=".csv"
              onChange={(e) => setInteractiveFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nonInteractive">Non-Interactive Sign-ins (Applications)</Label>
            <Input
              id="nonInteractive"
              type="file"
              accept=".csv"
              onChange={(e) => setNonInteractiveFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handleAnalyze} className="bg-blue-600 hover:bg-blue-700 text-white">
              Analyze & Update Dashboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
