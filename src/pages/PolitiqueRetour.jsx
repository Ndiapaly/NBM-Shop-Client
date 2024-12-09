import React from 'react';

const PolitiqueRetour = () => {
  const returnPolicies = [
    {
      title: "Délai de Retour",
      description: "Vous disposez de 14 jours calendaires à compter de la date de réception de votre commande pour effectuer un retour."
    },
    {
      title: "Conditions de Retour",
      description: "Le produit doit être dans son état d'origine, non utilisé, non lavé, avec toutes ses étiquettes et son emballage d'origine."
    },
    {
      title: "Produits Exclus",
      description: "Certains articles ne peuvent pas être retournés : produits personnalisés, sous-vêtements, articles soldés ou en promotion."
    },
    {
      title: "Processus de Retour",
      description: "Contactez notre service client pour obtenir un numéro de retour. Les frais de retour sont à la charge du client sauf en cas de produit défectueux."
    },
    {
      title: "Remboursement",
      description: "Le remboursement est effectué dans un délai de 14 jours après réception et vérification du produit retourné, via le mode de paiement original."
    }
  ];

  const steps = [
    "Connectez-vous à votre compte",
    "Sélectionnez la commande à retourner",
    "Choisissez le motif de retour",
    "Imprimez le bon de retour",
    "Emballez soigneusement le produit",
    "Expédiez le colis à l'adresse indiquée"
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 mt-12">
        Politique de Retour et d'Échange
      </h1>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Nos Conditions de Retour
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {returnPolicies.map((policy, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-bold text-blue-600 mb-4">
                  {policy.title}
                </h3>
                <p className="text-gray-700">
                  {policy.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Étapes du Retour
          </h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              {steps.map((step, index) => (
                <li key={index} className="text-lg">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">
          Des questions sur un retour ?
        </p>
        <a 
          href="/contact" 
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
        >
          Contactez notre Service Client
        </a>
      </div>
    </div>
  );
};

export default PolitiqueRetour;
