import styled from "styled-components";
import { NFTs } from "../../Info";
import { Colors, Devices } from "../Theme";
import Grid from "../styled/Grid.styled";
import Link from "next/link";
import NFTCard from "../styled/NFTCard.styled";
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import NFTMarketplace from './NFTMarketplace.json'



const TopCollectiblesEl = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 1rem;

  @media ${Devices.Tablet} {
    padding: 1rem 3rem;
  }
  @media ${Devices.Laptop} {
    padding: 1rem 5%;
  }
  @media ${Devices.LaptopL} {
    padding: 1rem 10%;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 500;
  color: #323232
`;
const TopSection = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Sort = styled.div`
  border-radius: 30px;
  border: 1px solid ${Colors.Primary};
  padding: 0.4rem 1rem;
  cursor: pointer;
  color: #323232
`;
const Date = styled.div`
  background: #87bb5d;
  border-radius: 30px;
  padding: 0.4rem 2.5rem;
`;
const ShowMore = styled.button`
  margin-top: 1rem;
  cursor: pointer;
  border: 1px solid ${Colors.Primary};
  padding: 1rem 2rem;
  color: ${Colors.Primary};
  background-color: transparent;
  border-radius: 5px;
  font-size: 1rem;
`;

export default function TopCollectibles({}) {

  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    // const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_NODE_ID}`)
    const provider = new ethers.providers.JsonRpcProvider()
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, NFTMarketplace.abi, provider)
    const data = await contract.fetchMarketItems()

    /*
    *  map over items returned from smart contract and format 
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)

      
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded') 
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, NFTMarketplace.abi, signer)

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }

  return (
    <TopCollectiblesEl>
    <Title>Recently Listed Items</Title>
    <TopSection>
      <Sort>Sales Volume</Sort>
      <Date>Today</Date>
    </TopSection>
    <Grid>
      {nfts.map((nft,i) => {
        return (
          <Link key={i} href="/asset/[tokenId]"as={`/asset/${nft.tokenId}`}>
            <a>
              <NFTCard item={nft} />
            </a>
          </Link>
        );
      })}
    </Grid>
    <ShowMore>show more</ShowMore>
  </TopCollectiblesEl>
  );
}

// you are rendering this file also in detial page? right! This is on home page
//the individual asset file is the one named index.js which i should pass props to it. I know i am wrong on the individual items page, I didnt know how to do it thats why i wanted to share complete code but this is my pvt project )
// it's ok. I am just figuring out the list of items you're rendering on the detial page. The info rendered on details page is coming from index.js. Both The Top Collectibles and Index are same
// you have to make two files. ToCollectibles files for home and another file for detail where th only itemting that's e. There are 2 files. But the way they are fectich and rendering the data is the same.
// in detail page you don't have tofetch the data for it. becuase on lick you sending the item={nft} as prop. 
// I think we have a misunderstanding )
//The NFTCard is just that one small card with image etc. Its the one which receives the prop. The index.js , is a seperate page and isnt taking