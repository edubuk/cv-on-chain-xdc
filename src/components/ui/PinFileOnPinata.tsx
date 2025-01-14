
export const uploadToIpfs = async (
  inputFile: File | null,
  setIsUploading: (value: React.SetStateAction<boolean>) => void,
  userData:String
): Promise<{ metaDataHash: string | null; docHash: string | null }> => {
  try {
    if (!inputFile) {
      console.warn("No file provided");
      return {metaDataHash:null,docHash:null};
    }

    setIsUploading(true);

    // Upload file to IPFS
    const formData = new FormData();
    formData.append("file", inputFile);

    const fileUploadResponse = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PINATAJWT}`,
        },
        body: formData,
      }
    );

    const fileUploadResult = await fileUploadResponse.json();

    if (fileUploadResult?.IpfsHash) {
      // Construct metadata JSON
      const jsonMetadata = {
        name: `NFT of certificate for ${userData}`,
        description:"Each NFT in this collection showcases your academic and professional achievement individually registered as unique certificate on the Blockchain using Edubuk's dApp.",
        image:"https://gateway.pinata.cloud/ipfs/bafkreidtifis3clkzfzmyk3aqgri4nvto53nckeppdnvs6v62smu2dvqxi",
        hash: fileUploadResult.IpfsHash,
        date: new Date().toISOString(),
        collectionDescription:"The Edubuk Blockchain Verified Certification NFT Collection represents a groundbreaking leap in educational credentialing. Each NFT in this collection is a digital certification of educational achievements, securely stored and verified on the blockchain. These NFTs not only authenticate academic and professional accomplishments but also provide a tamper-proof, transparent, and permanent record of a learner's journey.This collection is designed for students, professionals, and educational institutions seeking to showcase verified qualifications in a modern, digital format. By leveraging blockchain technology, Edubuk ensures that each certificate is uniquely identifiable, easily shareable, and immune to forgery. Key Features: Authenticity: Each NFT is a verified proof of educational attainment, ensuring authenticity and credibility. Security: Stored on the blockchain, these certificates are immutable and secure against tampering or fraud. Transparency: Enables third-party verification by employers, educational institutions, and other stakeholders. Accessibility: Easily accessible and shareable, making it simple to showcase achievements globally. Why Choose Edubuk Certification NFTs? Innovative Technology: Utilizes cutting-edge blockchain technology to offer unparalleled security and authenticity.Global Recognition: Backed by Edubuk's reputation and partnerships with leading educational and professional organizations.Future-Proof: Represents the future of credentialing, moving beyond traditional paper-based certificates.For more information, please visit: https://edubukeseal.com,"
      };

      // Upload JSON metadata to IPFS
      const jsonUploadResponse = await fetch(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_PINATAJWT}`,
          },
          body: JSON.stringify(jsonMetadata),
        }
      );

      const jsonUploadResult = await jsonUploadResponse.json();

      if (jsonUploadResult?.IpfsHash) {
        console.log("Metadata uploaded successfully:", jsonUploadResult.IpfsHash);
       return {metaDataHash:jsonUploadResult.IpfsHash, docHash:fileUploadResult.IpfsHash};
      } else {
        console.error("Failed to upload JSON metadata:", jsonUploadResult);
      }
    } else {
      console.error("Failed to upload file:", fileUploadResult);
    }
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
  } finally {
    setIsUploading(false);
  }

  return {metaDataHash:null,docHash:null}; // Return null if upload fails
};

  