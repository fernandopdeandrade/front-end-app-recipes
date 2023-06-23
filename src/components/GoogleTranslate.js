import React, { useEffect } from 'react';
import '../styles/Translate.css';

function GoogleTranslate() {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element')
   }
   
   useEffect(() => {
     const addScript = document.createElement('script');

     addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');

     document.body.appendChild(addScript);
     window.googleTranslateElementInit = googleTranslateElementInit;
   }, [])
  
  return (
    <div id='google_translate_element' className='translate-container' />
  )
}

export default GoogleTranslate;