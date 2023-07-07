import React from 'react';
import './Widgets.css';
import InfoIcon from '@mui/icons-material/Info';

function Widgets() {
  const newsArticle = (heading, subtitle) => (
    <div className='widgets_article'>
      <div className='widgets_articleleft'></div>
      <div className='widgets_articleright'>
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className='widgets'>
      <div className='widgets_header'>
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      {newsArticle('Iron man is back? ', 'Top news ~ 9899 readers')}
      {newsArticle('New work from home sources', 'Top news ~ 9500 readers')}
      {newsArticle('Weekly Tech News 101', 'Top news ~ 9899 readers')}

    </div>
  );
}

export default Widgets;
