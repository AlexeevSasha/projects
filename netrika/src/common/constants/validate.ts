export const validateRu = new RegExp(/^[^а-яё]+$/iu);
export const validateEnRuNum = new RegExp(/^[\wА-ЯЁа-яё ]{0,1000}$/);
export const validateNum = new RegExp(/^[\d. ]{0,1000}$/);
export const validateFloat = new RegExp(/^[0-9]*[,][0-9]+$/);
export const validateFloatPoint = new RegExp(/^[0-9]*[.,][0-9]+$/);
export const validateVitrine = new RegExp(/^[a-z]{1}[\w]{0,100}$/);
export const validateNameRegister = (value: string) => value.length > 0; //[\wА-ЯЁа-яё.,-:;()+*\\/№%!?"'|=^#@$&]{1,1000}$
