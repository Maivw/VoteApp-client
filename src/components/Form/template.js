
export const template = ({ helveticaFont, height, rgb }) => (
  [
    {
      name: 'officeTitle',
      x: 20,
      y: height / 2 + 246,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0, 1),
      maxWidth: 100,
      lineHeight: height / 2 - 488,
    },
    {
      name: 'district',
      x: 120,
      y: height / 2 + 246,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0, 1),
      maxWidth: 100,
      lineHeight: height / 2 - 488,
    },
    {
      name: 'candidateName',
      x: 200,
      y: height / 2 + 246,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0, 1),
      maxWidth: 100,
      lineHeight: height / 2 - 488,
    },
    {
      name: 'address',
      x: 300,
      y: height / 2 + 246,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0, 1),
      maxWidth: 200,
      lineHeight: height / 2 - 488,
    },
    {
      name: 'occupation',
      x: 520,
      y: height / 2 + 246,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0, 1),
      maxWidth: 200,
      lineHeight: height / 2 - 488,
    }
  ]
) 