import styled from "styled-components";
import Image from "next/image";
import { Colors, Devices } from "./Theme";
import { HiOutlineExternalLink } from "react-icons/hi";
import { AiFillCaretLeft } from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { BsHeart, BsFillEyeFill, BsThreeDots } from "react-icons/bs";
import Tab from "../../../src/components/styled/Tabs.styled";
import Tabs from "../../../src/components/styled/Tabs.styled";
import Head from "next/head";
import EditionSelector from "../../../src/components/Asset/EditionSelector";
import OwnershipItem from "../../../src/components/Asset/OwnershipItem";
import BidSticky from "../../../src/components/Asset/BidSticky";
import { useRouter } from "next/router";
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import NFTMarketplace from '../../NFTMarketplace.json'
import Button from "../../../src/components/styled/Button.styled";
import AssetNFT from "../../../src/components/Asset"


const BidStickyEl = styled.article`
  box-shadow: 0 4px 40px rgb(0 0 0 /10%);
  border: 1px solid ${Colors.Border};
  padding: 0.8rem 1rem;
  border-radius: 5px;
  display: flex;
  position: sticky;
  background-color: ${Colors.White};
  bottom: 1rem;
`;
const LeftSectionBid = styled.div`
  display: none;
  flex: 1;
  gap: 1rem;
  @media ${Devices.Laptop} {
    display: flex;
  }
`;
const ThumbEl = styled.span`
  width: 80px;
  height: 80px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const EditionElBid = styled.span`
  font-weight: 500;
`;
const TitleBid = styled.span`
  font-weight: 600;
  font-size: 1.8rem;
`;
const RightSectionBid = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
  align-items: center;

  @media ${Devices.Laptop} {
    flex: 0.6;
  }
`;
const PlaceBidBtn = styled(Button)`
  flex: 1;
  width: 100%;
  font-size: 1.07rem;
`;
const TextEl = styled.span`
  color: ${Colors.Gray};
  font-size: 0.7rem;
`;










const AssetEl = styled.article`
  background-color: ${Colors.White};
  color: ${Colors.Black};
  padding: 1rem;
  display: flex;
  flex-direction: column;

  @media ${Devices.Laptop} {
    padding: 1rem 15%;
  }
`;
const SectionContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  @media ${Devices.Laptop} {
    flex-direction: row;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex: 0.7rem;
  flex-direction: column;
  gap: 1rem;
`;
const ImageEl = styled.div`
  border-radius: 30px;
  overflow: hidden;
`;
const ChainLink = styled.a`
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 500;
  align-items: center;
  border: 1px solid ${Colors.Border};
  padding: 1.5rem 1rem;
`;
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  flex: 0.95;
`;
const BackBtn = styled.span`
  color: ${Colors.Primary};
  display: flex;
  width: max-content;
  cursor: pointer;
  align-items: center;
`;
const TopBtns = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  svg {
    font-size: 1.5rem;
  }
`;

const LikesBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ViewsEl = styled(LikesBtn)``;
const ShareBtn = styled(LikesBtn)``;
const MoreBtn = styled(LikesBtn)`
  margin-left: auto;
`;

const AuthorContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  span {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
`;
const AvatarEl = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
`;
const CreatorLabel = styled.label`
  color: ${Colors.Gray};
  font-size: 0.9rem;
`;
const UsernameEl = styled.span``;
const EditionEl = styled.span`
  font-weight: 500;
`;
const Title = styled.h1`
  font-size: 1.7rem;
  display: inline-block;
  margin-right: 1rem;
`;
const MarketPlace = styled.span`
  border: 1px solid ${Colors.Gray};
  border-radius: 50px;
  padding: 0.2rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${Colors.Gray};
`;
const AcOfferLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${Colors.Gray};
`;
const Des = styled.p`
  white-space: pre-wrap;
`;
const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const Tag = styled.span`
  border: 1px solid ${Colors.Black};
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
`;

const AllTabs = [
  { Id: 1, Title: "Ownership", Content: <OwnershipItem /> },
  { Id: 2, Title: "History", Content: <Tab /> },
  { Id: 3, Title: "Bids", Content: <Tab /> },
  { Id: 4, Title: "Offers", Content: <Tab /> },
];








const Nft = () => {
  

  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [selectedNft, setSelectedNft] = useState()
  const router = useRouter()
  useEffect(() => {
    loadNFTs()
  }, [router])


  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
   // const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/ecce808847e94ac0acbf82a064057d47`)
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
      .catch(e => console.error(e))
     
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
                    price,
                    tokenId: i.tokenId.toNumber(),
                    seller: i.seller,
                    owner: i.owner,
                    name: meta.data.name,
                    description: meta.data.description,
                    image: meta.data.image,
      }
     

      
      return item
     
    }))
    setNfts(items)
    setLoadingState('loaded') 
   
  
  


    
  }

  
 console.log(nfts)

  
  useEffect(()=> {
    if (!nfts) return
    ;(async()=> {

      const nftItems = await nfts.getAll()
      
      
      const selectedNftArray = nftItems.filter(
         (nft) => nft.tokenId === router.query.tokenId
      )
      
      setSelectedNft(selectedNftArray[0])

     
    })()

    
  }, []
 
  )
  

 
  return <AssetNFT selectedNft={selectedNft}/>

}
export default Nft








