import React from "react";
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from "@/components/ui/SectionHeader";

/**
 * ContactPage Component - Displays contact information and social links.
 */
export default function ContactPage() {
  const contactDetails = [
    {
      icon: Mail,
      title: "Email",
      content: "contact@stephenjacobs.io",
      href: "mailto:contact@stephenjacobs.io",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (747) 267-9236",
      href: "tel:+1747-267-9236",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Valencia, California",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/stephenjacobs",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/stephenjacobs",
    },
  ];

  return (
    <PageLayout title="Contact" path="~/stephen/contact">
      <div className="space-y-16">
        {/* Introduction */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-mono text-cyan-400">
            Let's Connect
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I’m always happy to discuss new opportunities, collaborate on
            interesting projects, or answer any questions you may have. Feel
            free to reach out through any of the channels below.
          </p>
        </section>

        {/* Contact Information */}
        <section>
          <SectionHeader title="Contact Details" icon={Mail} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {contactDetails.map(({ icon: Icon, title, content, href }) => (
              <div
                key={title}
                className="p-6 rounded-lg border transition-transform duration-300 
                          bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 
                          hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <Icon size={28} className="text-cyan-400" />
                  <h2 className="text-2xl font-mono text-gray-800 dark:text-gray-100">
                    {title}
                  </h2>
                </div>
                {href ? (
                  <a
                    href={href}
                    className="text-gray-600 dark:text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    {content}
                  </a>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">{content}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Social Links */}
        <section>
          <SectionHeader title="Find Me Online" icon={MapPin} />
          <div className="flex justify-center space-x-8">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 
                          hover:text-cyan-400 transition-colors duration-200"
                aria-label={label}
              >
                <Icon size={28} />
                <span className="font-mono text-lg">{label}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}