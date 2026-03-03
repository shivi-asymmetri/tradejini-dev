import { storage } from "@/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

interface IPOStorageMapping {
  symbol: string;
  logo?: string;
  pdf?: string;
}

/**
 * Maps existing Firebase Storage files to IPO symbols
 * Searches in both Tradejini-IPO and Tradejini-IPO-pdf folders
 */
export class FirebaseStorageMapper {
  
  /**
   * Get all files for a specific IPO by name
   */
  static async getIPOFiles(ipoName: string): Promise<IPOStorageMapping> {
    const mapping: IPOStorageMapping = { symbol: ipoName };
    
    try {
      console.log(`🔍 Searching for files for IPO: ${ipoName}`);
      
      // Search in old folder first (priority)
      const oldFolderMapping = await this.searchInFolder(`Tradejini-IPO-pdf/${ipoName}`);
      console.log(`📁 Old folder mapping:`, oldFolderMapping);
      
      // Search in new folder as fallback
      const newFolderMapping = await this.searchInFolder(`Tradejini-IPO/${ipoName}`);
      console.log(`📁 New folder mapping:`, newFolderMapping);
      
      // Prioritize old folder over new folder
      mapping.logo = oldFolderMapping.logo || newFolderMapping.logo;
      mapping.pdf = oldFolderMapping.pdf || newFolderMapping.pdf;
      
      console.log(`✅ Final mapping:`, mapping);

    } catch (error) {
      console.error(`Error mapping files for ${ipoName}:`, error);
    }
    
    return mapping;
  }
  
  /**
   * Search in a specific folder path
   */
  private static async searchInFolder(path: string): Promise<Partial<IPOStorageMapping>> {
    const mapping: Partial<IPOStorageMapping> = {};
    
    try {
      console.log(`🔍 Searching in path: ${path}`);
      const folderRef = ref(storage, path);
      const result = await listAll(folderRef);
      console.log(`📂 Found ${result.items.length} files and ${result.prefixes.length} folders in ${path}`);
      
      // Check direct files
      for (const item of result.items) {
        const fileName = item.name.toLowerCase();
        const url = await getDownloadURL(item);
        
        if (fileName.includes('logo') || fileName.match(/\.(png|jpg|jpeg|svg|webp)$/)) {
          if (!mapping.logo) mapping.logo = url;
        }
        
        if (fileName.includes('pdf') || fileName.endsWith('.pdf')) {
          if (!mapping.pdf) mapping.pdf = url;
        }
      }
      
      // Check subdirectories
      for (const prefix of result.prefixes) {
        try {
          const subResult = await listAll(prefix);
          for (const item of subResult.items) {
            const fileName = item.name.toLowerCase();
            const url = await getDownloadURL(item);
            
            if (fileName.includes('logo') || fileName.match(/\.(png|jpg|jpeg|svg|webp)$/)) {
              if (!mapping.logo) mapping.logo = url;
            }
            
            if (fileName.includes('pdf') || fileName.endsWith('.pdf')) {
              if (!mapping.pdf) mapping.pdf = url;
            }
          }
        } catch {
          // Subfolder access error, continue
        }
      }
    } catch {
      // Folder doesn't exist
    }
    
    return mapping;
  }
}