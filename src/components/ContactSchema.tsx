import { useEffect } from 'react';

interface ContactSchemaProps {
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
  };
  workingHours: string;
  companyName: string;
}

const ContactSchema = ({ 
  phone, 
  email, 
  address, 
  workingHours, 
  companyName 
}: ContactSchemaProps) => {
  useEffect(() => {
    // Создаем структурированные данные для контактов
    const contactSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": companyName,
      "url": "https://sk-fullhouse.com",
      "logo": "https://sk-fullhouse.com/logo.png",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": phone,
          "contactType": "customer service",
          "availableLanguage": "Russian",
          "areaServed": "RU",
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "description": workingHours
          }
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": address.street,
        "addressLocality": address.city,
        "addressRegion": address.region,
        "postalCode": address.postalCode,
        "addressCountry": "RU"
      },
      "email": email,
      "sameAs": [
        "https://vk.com/sk_fullhouse",
        "https://instagram.com/sk_fullhouse"
      ]
    };

    // Удаляем существующий JSON-LD если есть
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Добавляем новый JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(contactSchema);
    document.head.appendChild(script);

    // Очистка при размонтировании
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [phone, email, address, workingHours, companyName]);

  return null; // Компонент не рендерит ничего
};

export default ContactSchema;
