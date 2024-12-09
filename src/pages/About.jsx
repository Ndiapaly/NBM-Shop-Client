import React from 'react';
import { motion } from 'framer-motion';
import { 
  StarIcon, 
  TrophyIcon, 
  HeartIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/solid';

const About = () => {
  const teamMembers = [
    { 
      name: 'Marie Ndiaye', 
      role: 'Fondatrice', 
      image: 'https://i.pinimg.com/474x/72/d3/ff/72d3ffc0a4d96a5329ff3518d0fb120c.jpg',
      description: 'Passionnée de mode et d\'entrepreneuriat'
    },
    { 
      name: 'Boubacar Tall', 
      role: 'Directeur Commercial', 
      image: 'https://i.pinimg.com/474x/92/2f/39/922f390a84c0e40d5eda507f91035db0.jpg',
      description: 'Expert en stratégie de vente et relation client'
    },
    { 
      name: 'Aminata Diallo', 
      role: 'Responsable Marketing', 
      image: 'https://i.pinimg.com/736x/54/d9/7a/54d97aff10fc09bd6d62962cdef6132f.jpg',
      description: 'Créative et innovante dans la communication'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white shadow-lg"
      >
        <div className="container mx-auto px-4 py-16 lg:py-24 grid md:grid-cols-2 items-center gap-12">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              MNBM-Shop
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Notre Histoire, Notre Passion
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Fondée en 2020, MNBM-Shop est née de la passion pour la mode et le désir de rendre les meilleures chaussures accessibles à tous. 
              Nous croyons en la qualité, le style et le confort.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <img 
              src="https://i.pinimg.com/474x/c3/06/cd/c306cdb32194ad4e86928723a0647611.jpg" 
              alt="Équipe MNBM-Shop" 
              className="w-full h-auto rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Valeurs */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Nos Valeurs Fondamentales
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { 
              icon: <StarIcon className="h-12 w-12 text-blue-600" />, 
              title: "Qualité", 
              description: "Sélection rigoureuse des meilleures marques" 
            },
            { 
              icon: <HeartIcon className="h-12 w-12 text-red-600" />, 
              title: "Passion", 
              description: "Amour du design et du style" 
            },
            { 
              icon: <TrophyIcon className="h-12 w-12 text-green-600" />, 
              title: "Excellence", 
              description: "Engagement total envers nos clients" 
            },
            { 
              icon: <GlobeAltIcon className="h-12 w-12 text-purple-600" />, 
              title: "Innovation", 
              description: "Toujours à la pointe des tendances" 
            }
          ].map((valeur, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all"
            >
              <div className="flex justify-center mb-4">
                {valeur.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {valeur.title}
              </h3>
              <p className="text-gray-600">
                {valeur.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Équipe */}
      <div className="container mx-auto px-4 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Notre Équipe
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-gray-100 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Rejoignez Notre Communauté
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Découvrez l'histoire derrière MNBM-Shop et notre engagement envers la qualité et le style.
          </p>
          <button 
            className="btn-primary px-8 py-4 rounded-full text-lg hover:bg-white hover:text-blue-600 transition-all"
          >
            En Savoir Plus
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
