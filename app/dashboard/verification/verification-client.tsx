"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, ExternalLink, CheckCircle2, FileCheck, Share2, BookOpen } from "lucide-react";

// Define types for the component props
interface Credential {
  id: string;
  credential_type: string;
  blockchain: string;
  contract_address: string;
  token_id: string;
  wallet_address: string;
  verification_status: string;
  is_verified: boolean;
  created_at: string;
  entity_id: string;
  transaction_hash: string;
  metadata_uri: string;
}

interface IPFSFile {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  ipfs_hash: string;
  ipfs_url: string;
  pinata_id: string;
  related_entity_type: string;
  related_entity_id: string;
  created_at: string;
  pinned_at: string;
}

interface VerificationClientProps {
  credentials: Credential[];
  ipfsFiles: IPFSFile[];
}

export default function VerificationClient({ credentials, ipfsFiles }: VerificationClientProps) {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Web3 Verification</h1>
          <p className="text-muted-foreground">
            Manage your blockchain-verified content and credentials
          </p>
        </div>
        <Button className="gap-2">
          <Shield className="h-4 w-4" />
          Verify New Content
        </Button>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Shield className="h-5 w-5 text-primary" />
              Blockchain Verification
            </CardTitle>
            <CardDescription>
              Your content verified on the blockchain with tamper-proof authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p className="mb-4">
              Web3 verification provides tamper-proof authentication for your portfolios, resumes, and certificates using 
              blockchain technology and IPFS (InterPlanetary File System). When your content is verified:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>It's stored permanently on IPFS with content addressing</li>
              <li>Ownership is recorded on the blockchain as an NFT</li>
              <li>Anyone can verify authenticity without depending on a central authority</li>
              <li>You can prove ownership by connecting your crypto wallet</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="gap-2" asChild>
              <a href="/docs/WEB3_VERIFICATION.md" target="_blank">
                <BookOpen className="h-4 w-4" />
                Learn More
              </a>
            </Button>
          </CardFooter>
        </Card>
        
        <Tabs defaultValue="credentials">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="credentials" className="gap-2">
                <Shield className="h-4 w-4" />
                Credentials
              </TabsTrigger>
              <TabsTrigger value="ipfs" className="gap-2">
                <FileCheck className="h-4 w-4" />
                IPFS Content
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="credentials" className="space-y-4">
            {credentials.length > 0 ? (
              credentials.map((credential) => (
                <Card key={credential.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg capitalize">
                        {credential.credential_type} Verification
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={credential.is_verified ? "success" : "pending"}
                          label={credential.is_verified ? "Verified" : "Pending"} 
                        />
                      </div>
                    </div>
                    <CardDescription>
                      Created on {new Date(credential.created_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium mb-1">Blockchain Details</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Network:</span>
                            <span className="font-medium capitalize">{credential.blockchain}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Contract:</span>
                            <span className="font-mono text-xs truncate max-w-[200px]">
                              {credential.contract_address}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Token ID:</span>
                            <span className="font-mono">{credential.token_id}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-1">Wallet Information</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Wallet Address:</span>
                            <span className="font-mono text-xs truncate max-w-[200px]">
                              {credential.wallet_address}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Transaction:</span>
                            <a 
                              href={`https://etherscan.io/tx/${credential.transaction_hash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-xs text-blue-600 hover:underline truncate max-w-[200px]"
                            >
                              {credential.transaction_hash.substring(0, 10)}...
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="gap-2" asChild>
                      <a 
                        href={`/verify/${credential.metadata_uri.replace('ipfs://', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Verify
                      </a>
                    </Button>
                    <Button className="gap-2" asChild>
                      <a 
                        href={`/verify/${credential.metadata_uri.replace('ipfs://', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Share2 className="h-4 w-4" />
                        Share Verification
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Credentials Found</CardTitle>
                  <CardDescription>
                    You haven't verified any content on the blockchain yet.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get started by verifying your portfolio, resume, or certificates on the blockchain.
                    This creates a tamper-proof, permanent record of your achievements.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button>Verify Your First Content</Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="ipfs" className="space-y-4">
            {ipfsFiles.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {ipfsFiles.map((file) => (
                  <Card key={file.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base truncate">
                        {file.file_name}
                      </CardTitle>
                      <CardDescription className="truncate">
                        {file.file_type} • {formatFileSize(file.file_size)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-2">
                        <span className="text-xs font-medium">IPFS Hash</span>
                        <p className="font-mono text-xs truncate bg-muted p-1.5 rounded">
                          {file.ipfs_hash}
                        </p>
                      </div>
                      <div className="text-xs grid grid-cols-2 gap-2">
                        <div>
                          <span className="block font-medium">Created</span>
                          <span className="text-muted-foreground">
                            {new Date(file.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="block font-medium">Type</span>
                          <span className="text-muted-foreground capitalize">
                            {file.related_entity_type || 'File'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button size="sm" variant="outline" className="gap-1" asChild>
                        <a
                          href={`https://gateway.pinata.cloud/ipfs/${file.ipfs_hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View
                        </a>
                      </Button>
                      <Button size="sm" className="gap-1" asChild>
                        <a
                          href={`/verify/${file.ipfs_hash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          Verify
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No IPFS Content Found</CardTitle>
                  <CardDescription>
                    You haven't stored any content on IPFS yet.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    When you verify content, it's automatically stored on IPFS (InterPlanetary File System),
                    a distributed storage network that ensures your content remains accessible and unchanged.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button>Upload to IPFS</Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Helper components
function Badge({ variant, label }: { variant: 'success' | 'pending' | 'error', label: string }) {
  const variantStyles = {
    success: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    error: "bg-red-50 text-red-700 border-red-200"
  };
  
  return (
    <span className={`px-2 py-1 text-xs rounded-full border ${variantStyles[variant]}`}>
      {label}
    </span>
  );
}

// Helper functions
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  else return (bytes / 1073741824).toFixed(1) + ' GB';
} 