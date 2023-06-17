import React from 'react';
import CardsData from '../../Data/SummaryCards.json';
import { Grid } from '@mui/material';
import { SummaryCard } from '../SummaryCard';

export const SummaryBox = ({ data }) => {
  let CardsInfo = CardsData;

  const updatedCardsData = CardsInfo.map((card) => {
    const progressItem = data?.find((item) =>
      item.title.toLowerCase().includes(card.title.toLowerCase())
    );

    const progress = progressItem ? progressItem.progress : 0;

    return {
      ...card,
      progress: progress,
    };
  });

  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {updatedCardsData.map((item) => (
        <Grid item xs={12} sm={6} lg={3} key={item.title}>
          <SummaryCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
};
