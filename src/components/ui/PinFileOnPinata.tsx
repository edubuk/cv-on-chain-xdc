
export const uploadToIpfs = async (
  inputFile: File | null,
  setIsUploading: (value: React.SetStateAction<boolean>) => void
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
        name: "Edubuk Certificate NFT",
        description:
          "This NFT represents a unique and verifiable certification of educational achievement in the education domain.",
        image:
          "https://gateway.pinata.cloud/ipfs/bafkreiht6k6nbku5msadjocol4varmwykh67sjbhmfrbprqmqpse6lzk6u",
        hash: fileUploadResult.IpfsHash,
        date: new Date().toISOString(),
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

  