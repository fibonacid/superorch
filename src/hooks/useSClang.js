import {useContext} from 'react';
import {SClangContext} from '../context/sclang-context';

export default function useSclang() {
   const context = useContext(SClangContext);
   if (!context) {
     throw new Error("useSclang must be used within SclangProvider");
   }
   return context; 
}