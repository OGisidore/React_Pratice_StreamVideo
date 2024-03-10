import { EsperoDB } from "esperodb";

const dataStructure: any = [
    {
      videos: [
        {
             indexes: [
              { slug: { unique: true } },
              { category: { unique: false } }
            ],
             primaryKey: '_id' },
      ],
    }
  ];
 export const db = new EsperoDB('Wetube', dataStructure, 2);