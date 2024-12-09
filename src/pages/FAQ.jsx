import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <span className="text-lg font-semibold text-gray-800">{question}</span>
        <span className="text-blue-500">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600 text-base">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: "Comment passer une commande ?",
      answer: "Pour passer une commande, parcourez nos produits, sélectionnez les articles désirés, ajoutez-les au panier, puis suivez les étapes de paiement et de livraison."
    },
    {
      question: "Quels sont les modes de paiement acceptés ?",
      answer: "Nous acceptons les cartes de crédit/débit (Visa, MasterCard), les paiements mobile money, et les virements bancaires."
    },
    {
      question: "Combien de temps prend une livraison ?",
      answer: "Les délais de livraison varient entre 2-5 jours ouvrables selon votre localisation. Les commandes sont traitées et expédiées sous 24-48 heures."
    },
    {
      question: "Puis-je suivre ma commande ?",
      answer: "Oui, une fois votre commande expédiée, vous recevrez un numéro de suivi par email que vous pourrez utiliser pour tracker votre colis."
    },
    {
      question: "Comment faire un échange ou un remboursement ?",
      answer: "Consultez notre page Politique de Retour pour les détails complets sur les conditions d'échange et de remboursement."
    },
    {
      question: "Les produits sont-ils garantis ?",
      answer: "Tous nos produits bénéficient d'une garantie constructeur. En cas de défaut, contactez notre service client pour une assistance."
    },
    {
      question: "Comment me faire conseiller ?",
      answer: "Notre équipe est disponible par chat en ligne, email et téléphone pour vous guider dans votre choix de produit."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 mt-12">
        Questions Fréquentes
      </h1>
      
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem 
              key={index} 
              question={faq.question} 
              answer={faq.answer} 
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">
          Vous n'avez pas trouvé de réponse à votre question ?
        </p>
        <a 
          href="/contact" 
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
        >
          Contactez-nous
        </a>
      </div>
    </div>
  );
};

export default FAQ;
