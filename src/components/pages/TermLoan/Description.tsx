import React from 'react'

type TermLoanDescriptionProp = {
    content?:string
}
function Description({content}:TermLoanDescriptionProp) {
  return (
      <p className='text-darkTextColor  text-sm pt-10 text-justify'>
          Lörem ipsum tillväxtföretag kasat till intragen, i parasa respektive
          näpaktig. Dosamma Anna Hermansson, anat, gir. Fösivagt lyr
          trängselskatt ortad, och nagelprotest, rekät. Best grafen vid piligt.
          Desbel plabul. Lörem ipsum tillväxtföretag kasat till intragen, i
          parasa respektive näpaktig. Dosamma Anna Hermansson, anat, gir.
          Fösivagt lyr trängselskatt ortad, och nagelprotest, rekät. Best grafen
          vid piligt. Desbel plabul. Lörem ipsum tillväxtföretag kasat till
          intragen, i parasa respektive näpaktig. Dosamma Anna Hermansson, anat,
          gir. Fösivagt lyr trängselskatt ortad, och nagelprotest, rekät. Best
          grafen vid piligt. Desbel plabul.{" "}
      </p>
  );
}

export default Description