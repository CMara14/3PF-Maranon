import { Student } from "../models";
import { v4 as uuidv4 } from 'uuid';

export const STUDENTS_DATA: Student[] = [
  {id: uuidv4(), name: 'Henry', lastName: 'Frazier', email: 'henry.frazier@example.com', phoneNumber: 491614419},
  {id: uuidv4(), name: 'Kathy', email: 'kathy.collins@example.com', lastName: 'Collins', phoneNumber: 812336521},
  {id: uuidv4(), name: 'Denise', email: 'denise.lacroix@example.com' , lastName: 'Lacroix', phoneNumber: 783864733},
  {id: uuidv4(), name: 'Geraldine', email: 'geraldine.duarte@example.com', lastName: 'Duarte', phoneNumber: 5427351572},
  {id: uuidv4(), name: 'Dwight', email: 'wight.vargas@example.com', lastName: 'Vargas', phoneNumber: 7755205614},
  {id: uuidv4(), name: 'Anton', email: 'anton.petersen@example.com' , lastName: 'Petersen', phoneNumber: 26155813},
];