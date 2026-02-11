'use client';

import { useEffect } from 'react';
import { Download, Mail, Globe, MapPin } from 'lucide-react';
import { useAchievements } from '../../contexts/AchievementsContext';
import { cvContent } from '../../data/filesystem';

export function PDFViewer() {
  const { unlockAchievement } = useAchievements();

  useEffect(() => {
    unlockAchievement('actually-read-it');
  }, [unlockAchievement]);

  const handleDownload = () => {
    const cvText = `
${cvContent.name}
${cvContent.title}

Contact: ${cvContent.email} | ${cvContent.location} | ${cvContent.website}

SUMMARY
${cvContent.summary}

EXPERIENCE
${cvContent.experience.map(exp => `
${exp.role}
${exp.company} | ${exp.period}
${exp.highlights.map(h => `- ${h}`).join('\n')}
`).join('\n')}

SKILLS
${cvContent.skills.join(', ')}

EDUCATION
${cvContent.education.degree}
${cvContent.education.school}, ${cvContent.education.year}
    `.trim();

    const blob = new Blob([cvText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-warm-800/30 bg-desktop-surface/50">
        <span className="text-sm text-warm-400">cv.pdf</span>
        <button
          className="flex items-center gap-2 px-3 py-1.5 bg-warm-700 hover:bg-warm-600 text-warm-200 text-sm rounded transition-colors"
          onClick={handleDownload}
        >
          <Download size={14} />
          Download
        </button>
      </div>

      <div className="flex-1 overflow-auto bg-warm-900/50 p-8">
        <div className="max-w-2xl mx-auto bg-white text-gray-900 shadow-xl rounded-sm">
          <div className="p-8">
            <header className="text-center mb-8 pb-6 border-b border-gray-200">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{cvContent.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{cvContent.title}</p>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Mail size={14} />
                  {cvContent.email}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {cvContent.location}
                </span>
                <span className="flex items-center gap-1">
                  <Globe size={14} />
                  {cvContent.website}
                </span>
              </div>
            </header>

            <section className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                Summary
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">{cvContent.summary}</p>
            </section>

            <section className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Experience
              </h2>
              <div className="space-y-5">
                {cvContent.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500">{exp.period}</span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="text-sm text-gray-700 flex">
                          <span className="mr-2 text-gray-400">-</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {cvContent.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                Education
              </h2>
              <div>
                <h3 className="font-semibold text-gray-900">{cvContent.education.degree}</h3>
                <p className="text-sm text-gray-600">
                  {cvContent.education.school}, {cvContent.education.year}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
