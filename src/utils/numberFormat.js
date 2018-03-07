import numeral from 'numeral';
export default function numberFormat(number){
  return numeral(number).format('0,0.00');
}

