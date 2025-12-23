import SwipeableCard from '@/components/SwipeableCard';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const INITIAL_CARDS = [
  { id: 1, title: 'Card 1', image: { uri: 'https://picsum.photos/400/600?random=1' } },
  { id: 2, title: 'Card 2', image: { uri: 'https://picsum.photos/400/600?random=2' } },
  { id: 3, title: 'Card 3', image: { uri: 'https://picsum.photos/400/600?random=3' } },
  { id: 4, title: 'Card 4', image: { uri: 'https://picsum.photos/400/600?random=4' } },
];

const Settings = () => {
  const [cards, setCards] = useState(INITIAL_CARDS);

  const rotateCards = (indexToRemove: number) => {
    setCards((prevCards) => {
      const cardsCopy = [...prevCards];
      const movedCard = cardsCopy.pop();

      if (movedCard) {
        const recycledCard = { ...movedCard, id: Date.now() + Math.random() };
        return [recycledCard, ...cardsCopy];
      }
      return prevCards;
    });
  };

  const handleSwipeLeft = (index: number) => {
    console.log('Geser Kiri (Hapus/Nope):', cards[index].title);
    rotateCards(index);
  };

  const handleSwipeRight = (index: number) => {
    console.log('Geser Kanan (Suka/Like):', cards[index].title);
    rotateCards(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {cards.map((item, index) => {
          const isTopCard = index === cards.length - 1;
          const stackIndex = cards.length - 1 - index;

          if (stackIndex > 3) return null;

          return (
            <View
              key={item.id}
              style={[
                styles.cardWrapper,
                {
                  zIndex: index,
                  transform: [{ scale: 1 - stackIndex * 0.05 }],
                  opacity: stackIndex === 0 ? 1 : 0.95,
                },
              ]}
              pointerEvents={isTopCard ? 'auto' : 'none'}
            >
              <SwipeableCard item={item} index={index} onSwipeLeft={() => handleSwipeLeft(index)} onSwipeRight={() => handleSwipeRight(index)} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    position: 'absolute',
    width: '100%', // Wrapper tetap 100%, ukuran kartu diatur di SwipeableCard
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Settings;
