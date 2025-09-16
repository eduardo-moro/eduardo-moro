import React from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Download, Folder, Calendar } from 'lucide-react';

interface ContactsProps {
  className?: string;
}


export default function Contacts({ className = "" }: ContactsProps) {
  const classes = "flex items-center gap-2 justify-center w-full text-foreground flex-col hover:border-1 border-foreground p-2 rounded-lg"
  return (
    <div id='contacts' className={`flex flex-col items-center justify-center min-h-screen w-full ${className}`}>
      <h3 className='mb-8 font-mono text-lg bg-background'>Eduardo Moro | Contatos</h3>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
        <Button variant={'link'}>
          <a 
            href="https://github.com/eduardo-moro" 
            target="_blank" rel="noopener noreferrer" 
            className={classes}
          >
            <Github className="h-5 w-5" />
            <p className='font-mono'>{'[ GitHub ]'}</p>
          </a>
        </Button>
        <Button variant={'link'}>
          <a 
            href="https://linkedin.com/in/eduardomoro" 
            target="_blank" rel="noopener noreferrer" 
            className={classes}
          >
            <Linkedin className="h-5 w-5" />
            <p className='font-mono'>{'[ LinkedIn ]'}</p>
          </a>
        </Button>
        <Button variant={'link'}>
          <a 
            href="mailto:dev.eduardomoro@gmail.com" 
            className={classes}
          >
            <Mail className="h-5 w-5" />
            <p className='font-mono'>{'[ Email ]'}</p>
          </a>
        </Button>
        <Button variant={'link'}>
          <a 
            href="https://www.tabnews.com.br/eduardomoro/conteudos/1" 
            target="_blank" rel="noopener noreferrer" 
            className={classes}
          >
            <Folder className="h-5 w-5" />
            <p className='font-mono'>{'[ TabNews ]'}</p>
          </a>
        </Button>
        <Button variant={'link'}>
          <a 
            href="https://calendly.com/dev-eduardomoro" 
            target="_blank" rel="noopener noreferrer" 
            className={classes}
          >
            <Calendar className="h-5 w-5" />
            <p className='font-mono'>{'[ Calendly ]'}</p>
          </a>
        </Button>
        <Button variant={'link'}>
          <a 
            href="/Eduardo Moro — Analista de sistemas Go.pdf" 
            download 
            className={classes}
          >
            <Download className="h-5 w-5" />
            <p className='font-mono'>{'[ Curriculo'} ]</p>
          </a>
        </Button>
      </div>
    </div>
  );
}