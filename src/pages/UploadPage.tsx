import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Upload as UploadIcon, 
  FileText, 
  Check, 
  X,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Building2,
  Layers
} from 'lucide-react';

const UploadPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvStatus, setCvStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setCvStatus('error');
      return;
    }

    if (file.size > maxSize) {
      setCvStatus('error');
      return;
    }

    setCvFile(file);
    setCvStatus('uploading');
    
    // Simulate upload
    setTimeout(() => {
      setCvStatus('success');
    }, 1500);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (cvStatus === 'success' && jobDescription.trim()) {
      // Save to state/context and navigate
      navigate('/interview/start');
    }
  };

  const isValid = cvStatus === 'success' && jobDescription.trim().length > 50;

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">{t('upload.title')}</h1>
          <p className="text-muted-foreground">
            Upload your CV and paste the job description to get personalized interview questions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* CV Upload */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              {t('upload.cv.title')}
            </h2>

            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive
                  ? 'border-primary bg-primary/5'
                  : cvStatus === 'success'
                  ? 'border-success bg-success/5'
                  : cvStatus === 'error'
                  ? 'border-destructive bg-destructive/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {cvStatus === 'idle' && (
                <>
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <UploadIcon className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-medium mb-1">{t('upload.cv.desc')}</p>
                  <p className="text-sm text-muted-foreground">{t('upload.cv.formats')}</p>
                </>
              )}

              {cvStatus === 'uploading' && (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto animate-pulse">
                    <UploadIcon className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-medium">Uploading...</p>
                  <div className="w-full max-w-xs mx-auto h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '60%' }} />
                  </div>
                </div>
              )}

              {cvStatus === 'success' && cvFile && (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-success/10 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-success">Upload complete!</p>
                    <p className="text-sm text-muted-foreground">{cvFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCvFile(null);
                      setCvStatus('idle');
                    }}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              )}

              {cvStatus === 'error' && (
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto">
                    <X className="w-8 h-8 text-destructive" />
                  </div>
                  <p className="font-medium text-destructive">Upload failed</p>
                  <p className="text-sm text-muted-foreground">
                    Please upload a PDF or DOCX file under 5MB.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCvStatus('idle');
                    }}
                  >
                    Try again
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              {t('upload.jd.title')}
            </h2>

            <div className="space-y-4">
              <div>
                <Textarea
                  placeholder={t('upload.jd.placeholder')}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {jobDescription.length} characters (minimum 50)
                </p>
              </div>

              {/* Optional fields */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-muted-foreground mb-4">
                  {t('upload.jd.optional')}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle" className="text-sm">
                      <Briefcase className="w-3 h-3 inline mr-1" />
                      {t('upload.jobTitle')}
                    </Label>
                    <Input
                      id="jobTitle"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g., Software Engineer"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm">
                      <Building2 className="w-3 h-3 inline mr-1" />
                      {t('upload.company')}
                    </Label>
                    <Input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g., Google"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-sm">
                      <Layers className="w-3 h-3 inline mr-1" />
                      {t('upload.industry')}
                    </Label>
                    <Input
                      id="industry"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      placeholder="e.g., Technology"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-sm">
                      {t('upload.experience')}
                    </Label>
                    <select
                      id="experience"
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm"
                    >
                      <option value="">Select level</option>
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior</option>
                      <option value="lead">Lead / Manager</option>
                      <option value="executive">Executive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="mt-8 flex justify-end">
          <Button
            variant="hero"
            size="lg"
            onClick={handleSubmit}
            disabled={!isValid}
          >
            {t('upload.continue')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;