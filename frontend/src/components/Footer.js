import React from 'react';
import PayementIcons from './PayementIcons';

import SocialIcons from './SocialIcons';

const Footer = () => {
    return (
      
        <div className='main-footer'>
           <div className='container'>
             <div className='row'>
               <div className='col'>
                 <h4>Informations sur l'entreprise</h4>
                 <ul className='list-unstyled'>
                   <li><a href="#">Qui Sommes-Nous ?</a></li>
                   <li><a href="#">Affilie</a></li>
                   <li><a href="#">Blogger</a></li>
                 </ul>
              </div>
              
               <div className='col'>
                 <h4>Centre D'Aide</h4>
                 <ul className='list-unstyled'>
                   <li><a href="#">Livraison</a></li>
                   <li><a href="#">Retour</a></li>
                   <li><a href="#">Commande</a></li>
                 </ul>
              </div>
              
               <div className='col'>
                 <h4>Aide</h4>
                 <ul className='list-unstyled'>
                   <li><a href="#">Nous Contacter</a></li>
                   <li><a href="#">Paiement a la livraison</a></li>
                   <li><a href="#">Paiement</a></li>
                 </ul>
              </div>
              <div className='col'>
                 <h4>Nous Acceptons</h4>
                 <ul className='list-unstyled'>
                   <li><a href="#"></a></li>
                   <li><a href="#"><PayementIcons/></a></li>
                 </ul>
              </div>


             </div>
            <hr/> 
             <div className='row'>
               <div className='col'>
                 <p className='col-sm'> &copy;{new Date().getFullYear()}  JAYSHOP | All right reserved | Terms Of Service | Privacy
                 </p>
              </div>
              <div className='col'> TROUVEZ-NOUS SUR  <SocialIcons/></div>
             </div>

           </div>
         </div>
     
    );
  };

export default Footer;