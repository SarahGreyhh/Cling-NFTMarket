
import { useRouter } from "next/router";
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import NFTMarketplace from '../../NFTMarketplace.json'
import AssetNFT from "../../../src/components/Asset"


export const getStaticPaths = async() => {
  const provider = new ethers.providers.JsonRpcProvider()
  const contract = new ethers.Contract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, NFTMarketplace.abi, provider)
  const data = await contract.fetchMarketItems()
  /*
  *  mapping over items returned from smart contract and format 
  *  them as well as fetch their token metadata
  * 
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

  
   const paths = items.map(nft => {
    return{
      params: { tokenId: nft.tokenId.toString()}
    }
   })

   return {
    paths,
    fallback:false
   }

}

export const getStaticProps = async(context) => {
  const tokenId = context.params.tokenId
  const provider = new ethers.providers.JsonRpcProvider()
  const contract = new ethers.Contract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, NFTMarketplace.abi, provider)
  const data = await contract.fetchMarketItems()
  /*
  *  mapping over items returned from smart contract and format 
  *  them as well as fetch their token metadata
  * 
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
    
    return item + tokenId
  })) 

  return {
    props: {nft: items}
  }

}

 const Nft = (nft) => {

  return <div>{nft.name}</div>
}

export default Nft








