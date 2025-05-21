// ce script extrait le texte d'une page web et le transfrome en markdown
//
// Mozilla Readability est le meilleur lecteur (pour extraite le texte d'une page Html), comme dans FireFox
// et il n'existe que sous Javascript (et pas en Python).
// Ce Javascript a besoin de NodeJS pour s'exécuter en dehors d'un navigateur.
//
// npm install node-fetch jsdom @mozilla/readability turndown
//
import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import TurndownService from 'turndown';

console.log("*** début ***");

const turndownService = new TurndownService();

// Fonction pour convertir le HTML en Markdown
function convertHtmlToMarkdown(html) {
    return turndownService.turndown(html);
}

// Fonction pour supprimer les balises de lien et d'image Markdown
function removeMarkdownLinksAndImages(markdown) {
    // Utilisation d'une expression régulière pour supprimer les liens et les images Markdown
    return markdown
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Supprime les liens Markdown
        .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1'); // Supprime les images Markdown
}

// Fonction principale
async function fetchAndWrite(url, ecole) {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text();
        const document = new JSDOM(html).window.document;
        const reader = new Readability(document);
        const article = reader.parse();

        if (!article) {
            throw new Error('Could not parse the article');
        }

        const articleText = convertHtmlToMarkdown(article.content);
        let titre = article.title.replace(/\//g, "-"); // Enlever les / du titre

        console.log("***** titre avant modif " + article.title);
        console.log("***** titre après modif " + titre);

        // Supprimer les liens et les images Markdown
        const articleTextWithoutLinksAndImages = removeMarkdownLinksAndImages(articleText);

        console.log(articleTextWithoutLinksAndImages);
        const cleanedArticleText = articleTextWithoutLinksAndImages.replace(/\n\s*\n/g, '\n').trim(); // Enlever les lignes blanches
        const articleFinal = cleanedArticleText.replace(/\t/g, ""); // Enlever les tabulations

        // Tester si le fichier existe, si oui ajouter un suffixe
        let i = 1;
        let originalNomFichier = path.join('md', `${ecole} - html - ${titre}.md`);
        let nomFichier = originalNomFichier;
        while (fs.existsSync(nomFichier)) {
            const { dir, name, ext } = path.parse(originalNomFichier);
            nomFichier = path.join(dir, `${name}-${i}${ext}`);
            i++;
        }

        // Vérifier si le répertoire 'txt' existe, sinon le créer
        const dir = path.dirname(nomFichier);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Écrire le fichier
        fs.writeFileSync(nomFichier, articleFinal);
        console.log('Le fichier a été créé avec succès!');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Transformation des pages web en fichier MD
fetchAndWrite('https://www.centralesupelec.fr/fr/le-cursus-ingenieur', 'CentraleSupélec');
// fetchAndWrite('https://www.centralesupelec.fr/fr/le-cursus-ingenieur?tab=pluridisciplinarite-au-coeur-du-cursus', 'CentraleSupélec');
// fetchAndWrite('https://www.centralesupelec.fr/fr/le-cursus-ingenieur?tab=projets-a-la-carte', 'CentraleSupélec');
// fetchAndWrite('https://www.centralesupelec.fr/fr/le-cursus-ingenieur?tab=double-competence', 'CentraleSupélec');
// fetchAndWrite('https://www.centralesupelec.fr/fr/le-cursus-ingenieur?tab=programme-grande-ecole-voies-dadmission', 'CentraleSupélec');
// fetchAndWrite('https://www.centralesupelec.fr/fr/le-cursus-ingenieur?tab=droits-de-scolarite', 'CentraleSupélec');
// fetchAndWrite('https://www.centralesupelec.fr/fr/le-cursus-ingenieur?tab=es-secteurs-davenir', 'CentraleSupélec');    // ininteressant (que l'adresse du site)
// fetchAndWrite('https://www.centralesupelec.fr/fr/le-cursus-ingenieur?tab=reseau-planetaire-excellence', 'CentraleSupélec');
// fetchAndWrite('https://www.centralesupelec.fr/fr/le-cursus-ingenieur?tab=vie-associative-dense', 'CentraleSupélec');

// fetchAndWrite('https://www.minesparis.psl.eu/formations/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/le-cycle-ingenieur-civil/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/cycle-ingenieurs-de-specialite-energetique/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/licences/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/masters/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/masteres-specialises/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/le-corps-des-mines/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/doctorat/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/executive-education/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/vae/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/international/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/international/mobilites-internationales/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/cycle-ingenieurs-de-specialite-energetique/le-cycle-ingenieur-de-specialite-energetique-en-formation-continue-fc/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/cycle-ingenieurs-de-specialite-energetique/le-cycle-ingenieur-de-specialite-energetique-en-formation-continue-fc/le-programme-isupfere-en-formation-continue-fc/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/cycle-ingenieurs-de-specialite-energetique/le-cycle-ingenieur-de-specialite-energetique-en-formation-continue-fc/le-rythme-dalternance/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/cycle-ingenieurs-de-specialite-energetique/les-debouches/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/cycle-ingenieurs-de-specialite-energetique/isupfere-le-programme-fa/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/cycle-ingenieurs-de-specialite-energetique/une-formation-en-apprentissage/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/cycle-ingenieurs-de-specialite-energetique/admissions-fa/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/cycle-ingenieurs-de-specialite-energetique/le-cycle-ingenieur-de-specialite-energetique-en-formation-continue-fc/admissions-fc/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/international/mobilites-internationales/bourses-et-aides-a-la-mobilite-etudiante/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/international/etudiants-internationaux/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/international/etudiants-internationaux/bourses-et-aides-a-la-mobilite-entrante/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/international/les-langues-a-mines-paris-psl/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/doctorat/propositions-des-sujets-de-these/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/le-cycle-ingenieur-civil/le-cycle-ingenieurs-civils-la-premiere-annee/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/le-cycle-ingenieur-civil/le-cycle-ingenieurs-civils-la-2eme-annee/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/le-cycle-ingenieur-civil/admissions-et-scolarite/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/le-cycle-ingenieur-civil/le-cycle-ingenieurs-civiles-la-3eme-annee/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/le-cycle-ingenieur-civil/debouches/', 'Mines Paris');
// fetchAndWrite('https://www.minesparis.psl.eu/formations/le-cycle-ingenieur-civil/les-doubles-diplomes-en-france/', 'Mines Paris');

// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/1re-et-2e-annee', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/3e-annee', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/admission-0', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/admission-1', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/admission-pis', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/admission-s', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/admission', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/admissions-0', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/admissions-programme-grande-ecole', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/admissions-programme-ingenieur-de-specialite', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/admissions', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/affectations', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/APE', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/arts-et-metiers-partenaire-privilegie-des-entreprises', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/associations-danciens-eleves', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/associations-etudiantes', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/associations', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/bachelor-de-technologie', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/bachelor-filieres-de-la-batterie', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/bachelor-filieres-de-lindustrie', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/campus/lille', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/catalogue-masteres-specialises', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/classes-prepas', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/cursus-apprenti-0', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/cursus-apprenti', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/cursus-etudiant', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/cursus-formation-continue', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/cursus-militaire', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/doctorat', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/dut-bts', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/echange-academique', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/ecole-doctorale', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/etudiants-internationaux', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/faq-international', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/formalites-administratives', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/formation-continue-0', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/formation-continue-bachelor', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/formation-continue-m2', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/formation-continue-pis', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/formation-continue', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/formation-doctorale', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/formation-tout-au-long-de-la-vie', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/formations-courtes', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/formations-diplomantes', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/formations-inter-entreprises', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/formations-intra-entreprises', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/formations-par-specialite', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/fr/formation/parcours-international', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/informations-pratiques-0', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/informations-pratiques-1', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/informations-pratiques-2', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/informations-pratiques-3', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/informations-pratiques-4', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/informations-pratiques', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/ingenieur-de-specialite', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/ingenieur-generaliste', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/inscriptions', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/l3m1', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/logement-et-restauration', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/master-admissions', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/masteres-specialises-et-mba', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/masters-recherche', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/metiers-et-parcours-0', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/metiers-et-parcours-1', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/metiers-et-parcours-2', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/metiers-et-parcours-3', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/metiers-et-parcours', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/moocs-et-formations-digitales', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/parcours-international', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/parcours-m1-m2', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/parcours-m2', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/pedagogie-0', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/pedagogie-1', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/pedagogie', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/programmes-diplomants', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/specialites-de-m2', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/vae', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/validation-des-acquis', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/vap', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/vie-etudiante', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/www.banquept.fr', 'Arts et Métiers');
// fetchAndWrite('https://www.artsetmetiers.fr/fr/formation/www.ueensam.org', 'Arts et Métiers');

//fetchAndWrite('https://ecoledesponts.fr/2eme-et-3eme-annees', 'Ecolde des Ponts');   // KO car le site vérifie que c'est bien un navigateur qui charge la page
// si peu de sites concernés, on le fera manuellement 

console.log("*** fin ***");
