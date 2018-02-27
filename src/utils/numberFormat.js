import numeral from 'numeral';
export default function numberFormat(number){
  numeral(number).format('0,0.00');
}

