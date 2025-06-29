import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import type { Product, TargetFilter, CategoryFilter } from '@/types';

interface RealTimeRankingProps {
  products: Product[];
}

const INITIAL_PRODUCT_COUNT = 6;

const formatPrice = (price: number) => {
  return `${price} 원`;
};

const profileIconMap: Record<TargetFilter, string> = {
  전체: 'ALL',
  여성이: '👩🏻',
  남성이: '👨🏻',
  청소년이: '👦🏻',
};

const getProfileIconText = (filter: TargetFilter) =>
  profileIconMap[filter] || 'ALL';

const Container = styled.div`
  padding: ${theme.spacing.spacing4};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.title1Bold.fontSize};
  font-weight: ${theme.typography.title1Bold.fontWeight};
  line-height: ${theme.typography.title1Bold.lineHeight};
  color: ${theme.colors.textDefault};
  margin: 0 0 ${theme.spacing.spacing4} 0;
`;

const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.spacing2};
  margin-bottom: ${theme.spacing.spacing4};
`;

const FilterTab = styled.button<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.spacing2};
  padding: ${theme.spacing.spacing3};
  border: none;
  border-radius: 12px;
  background: transparent;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray100};
  }
`;

const ProfileIcon = styled.div<{ isActive: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 40%;
  background: ${props =>
    props.isActive ? theme.colors.blue700 : theme.colors.gray300};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  color: ${props => (props.isActive ? 'white' : theme.colors.blue500)};
  position: relative;
`;

const FilterLabel = styled.span<{ isActive: boolean }>`
  font-size: ${theme.typography.label1Regular.fontSize};
  font-weight: ${props =>
    props.isActive
      ? theme.typography.label1Bold.fontWeight
      : theme.typography.label1Regular.fontWeight};
  color: ${props =>
    props.isActive ? theme.colors.blue700 : theme.colors.textDefault};
`;

const SortContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: ${theme.colors.blue200};
  border-radius: 8px;
  padding: ${theme.spacing.spacing2};
  margin-bottom: ${theme.spacing.spacing4};
`;

const SortButton = styled.button<{ isActive: boolean }>`
  background: transparent;
  border: none;
  color: ${props =>
    props.isActive ? theme.colors.blue800 : theme.colors.blue600};
  font-size: ${theme.typography.label1Regular.fontSize};
  font-weight: ${props =>
    props.isActive
      ? theme.typography.body1Bold.fontWeight
      : theme.typography.label1Regular.fontWeight};
  padding: ${theme.spacing.spacing2} ${theme.spacing.spacing3};
  border-radius: 6px;
  transition: all 0.2s ease;
  text-align: center;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.spacing2};
  margin-bottom: ${theme.spacing.spacing4};
`;

const ProductCard = styled.div`
  overflow: hidden;
  position: relative;
  transition: all 0.2s ease;
  border-radius: 6px;
`;

const RankBadge = styled.div`
  position: absolute;
  top: ${theme.spacing.spacing2};
  left: ${theme.spacing.spacing2};
  width: 20px;
  height: 20px;
  background: ${theme.colors.red700};
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.typography.label2Bold.fontSize};
  font-weight: ${theme.typography.label2Bold.fontWeight};
  z-index: 1;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 224px;
  object-fit: cover;
  display: block;

  @media (max-width: 480px) {
    height: 100px;
  }
`;

const ProductInfo = styled.div`
  padding: ${theme.spacing.spacing2} ${theme.spacing.spacing3}
    ${theme.spacing.spacing3} 0;
`;

const BrandName = styled.div`
  font-size: ${theme.typography.label2Regular.fontSize};
  color: ${theme.colors.textSub}; /* 첫 번째 BBQ는 이 색상 */
  line-height: 1.2;
  margin-bottom: ${theme.spacing.spacing1};
`;

const StrongBrandName = styled(BrandName)`
  color: ${theme.colors
    .gray1000}; /* 더 진한 색상으로 변경, 예: theme.colors.gray1000 */
  /* 필요하다면 font-weight도 변경 가능: font-weight: ${theme.typography
    .label2Bold.fontWeight}; */
`;

const Price = styled.div`
  font-size: ${theme.typography.title2Bold.fontSize};
  font-weight: ${theme.typography.title2Bold.fontWeight};
  color: ${theme.colors.gray1000};

  @media (max-width: 480px) {
    font-size: ${theme.typography.label1Bold.fontSize};
  }
`;

const MoreButton = styled.button`
  width: 70%;
  padding: ${theme.spacing.spacing3};
  border: 1px solid ${theme.colors.borderDefault};
  border-radius: 6px;
  background: ${theme.colors.default};
  color: ${theme.colors.textDefault};
  font-size: ${theme.typography.body1Regular.fontSize};
  transition: all 0.2s ease;
  margin: 0 auto;
  display: block;

  &:hover {
    background: ${theme.colors.gray100};
    border-color: ${theme.colors.gray400};
  }
`;

const targetFilters: TargetFilter[] = ['전체', '여성이', '남성이', '청소년이'];
const categoryFilter: CategoryFilter[] = [
  '받고 싶어한',
  '많이 선물한',
  '위시로 받은',
];

export function RealTimeRanking({ products }: RealTimeRankingProps) {
  const [selectedTarget, setSelectedTarget] = useState<TargetFilter>('전체');
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>('받고 싶어한');
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll
    ? products
    : products.slice(0, INITIAL_PRODUCT_COUNT);

  const handleProductClick = (product: Product) => {
    console.log('상품 클릭:', product.name);
  };

  return (
    <Container>
      <SectionTitle>실시간 급상승 선물랭킹</SectionTitle>

      <FilterContainer>
        {targetFilters.map(filter => (
          <FilterTab
            key={filter}
            isActive={selectedTarget === filter}
            onClick={() => setSelectedTarget(filter)}
          >
            <ProfileIcon isActive={selectedTarget === filter}>
              {getProfileIconText(filter)}
            </ProfileIcon>
            <FilterLabel isActive={selectedTarget === filter}>
              {filter}
            </FilterLabel>
          </FilterTab>
        ))}
      </FilterContainer>

      <SortContainer>
        {categoryFilter.map(category => (
          <SortButton
            key={category}
            isActive={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </SortButton>
        ))}
      </SortContainer>

      <ProductGrid>
        {displayedProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            onClick={() => handleProductClick(product)}
          >
            <RankBadge>{index + 1}</RankBadge>
            <ProductImage src={product.imageURL} alt={product.name} />
            <ProductInfo>
              <BrandName>{product.brandInfo.name}</BrandName>
              <StrongBrandName>{product.brandInfo.name}</StrongBrandName>
              <Price>{formatPrice(product.price.sellingPrice)}</Price>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>

      <MoreButton onClick={() => setShowAll(!showAll)}>
        {showAll ? '접기' : '더보기'}
      </MoreButton>
    </Container>
  );
}
