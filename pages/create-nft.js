import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import Image from 'next/image'
import Styles from './create-nft.module.css'


const Input = styled.div`
    height: 2rem;
    border-radius: 10px;
    display: flex;
    padding-left: 1rem;`



const InnerContainer = styled.div`
    flex-direction: column;
    display: flex;
    width: 30rem;
    min-height: 60vh;
    justify-content: space-evenly;`





const Container = styled.div`
    height: 80vh;
    background-color: ;
    
    align-items: center;
    display: flex;
    justify-content: center;`

// https://community.infura.io/t/how-to-add-data-using-ipfs-http-client/5179
const auth =
'Basic ' + Buffer.from(process.env.NEXT_PUBLIC_IPFS_PROJECT_ID + ':' + process.env.NEXT_PUBLIC_IPFS_PROJECT_SECRET).toString('base64');

const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

import NFTMarketplace from './NFTMarketplace.json'
import styled from 'styled-components'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://${process.env.NEXT_PUBLIC_IPFS_GATEWAY}.infura-ipfs.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function uploadToIPFS() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://${process.env.NEXT_PUBLIC_IPFS_GATEWAY}.infura-ipfs.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function listNFTForSale() {
    const url = await uploadToIPFS()
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, NFTMarketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()
    console.log('listing price: ', listingPrice)
    listingPrice = listingPrice.toString()
    let transaction = await contract.createToken(url, price, { value: listingPrice })
    let res = await transaction.wait()
    console.log('NFT created: ', res)

   
    router.push('/')
  }

  return (

    <Container>
      <InnerContainer   className={Styles.InnerContainer}>
        
        <input 
          placeholder="Asset Name"
          className={Styles.input}
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className={Styles.input}
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="Asset Price in Eth"
          className={Styles.input}
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input
          type="file"
          name="Asset"
          className={Styles.inputImage}
          onChange={onChange}
        />
        
        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
        <button onClick={listNFTForSale} className={Styles.buybutton}>
          Create NFT
        </button>
      </InnerContainer>
    </Container>
  )
}