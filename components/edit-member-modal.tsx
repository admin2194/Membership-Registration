"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, User, Mail, Phone, Calendar, MapPin, Building, Plus, X, Edit } from "lucide-react"
import { apiClient } from "@/lib/api"

interface EditMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  memberId: string | null
}

interface MemberFormData {
  fullName: string
  email: string
  phoneNumber: string
  birthDate: string
  gender: string
  membershipLevelId: string
  jobTitle: string
  sectors: string[]
  needs: string[]
  agreedToTerms: boolean
  faydaId: string
  passportId: string
  kebeleId: string
  tinNumber: string
}

export function EditMemberModal({ isOpen, onClose, onSuccess, memberId }: EditMemberModalProps) {
  const [formData, setFormData] = useState<MemberFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    membershipLevelId: "",
    jobTitle: "",
    sectors: [],
    needs: [],
    agreedToTerms: false,
    faydaId: "",
    passportId: "",
    kebeleId: "",
    tinNumber: ""
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMember, setIsLoadingMember] = useState(false)
  const [error, setError] = useState("")
  const [membershipLevels, setMembershipLevels] = useState([])

  const sectors = [
    "Technology", "Agriculture", "Manufacturing", "Services", 
    "Healthcare", "Education", "Finance", "Retail", "Other"
  ]

  const needs = [
    "Training & Mentorship", "Access to Finance", "Market Access", 
    "Networking", "Technical Support", "Business Development", "Other"
  ]

  const handleInputChange = (field: keyof MemberFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSectorChange = (sector: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      sectors: checked 
        ? [...prev.sectors, sector]
        : prev.sectors.filter(s => s !== sector)
    }))
  }

  const handleNeedChange = (need: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      needs: checked 
        ? [...prev.needs, need]
        : prev.needs.filter(n => n !== need)
    }))
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full name is required"
    if (!formData.email.trim()) return "Email is required"
    if (!formData.phoneNumber.trim()) return "Phone number is required"
    if (!formData.birthDate) return "Birth date is required"
    if (!formData.gender) return "Gender is required"
    if (!formData.membershipLevelId) return "Membership level is required"
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    if (!memberId) {
      setError("Member ID is required")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Convert form data to API format
      const memberData = {
        fullName: formData.fullName,
        email: formData.email,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        birthDate: formData.birthDate,
        faydaId: formData.faydaId,
        passportId: formData.passportId,
        kebeleId: formData.kebeleId,
        tinNumber: formData.tinNumber,
        membershipLevelId: parseInt(formData.membershipLevelId),
        jobTitle: formData.jobTitle,
        sectors: formData.sectors,
        needs: formData.needs,
        agreedToTerms: formData.agreedToTerms
      }

      // Call API to update member
      await apiClient.updateMember(memberId, memberData)
      
      onSuccess()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update member")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMembershipLevels = async () => {
    try {
      const levels = await apiClient.fetchMembershipLevels()
      setMembershipLevels(levels)
    } catch (error) {
      console.error("Failed to fetch membership levels:", error)
    }
  }

  const fetchMemberData = async () => {
    if (!memberId) return
    
    setIsLoadingMember(true)
    try {
      const member = await apiClient.getMemberById(memberId)
      const memberData = member.data || member
      
      setFormData({
        fullName: memberData.fullName || "",
        email: memberData.email || "",
        phoneNumber: memberData.phoneNumber || "",
        birthDate: memberData.birthDate ? new Date(memberData.birthDate).toISOString().split('T')[0] : "",
        gender: memberData.gender || "",
        membershipLevelId: memberData.membershipLevelId?.toString() || "",
        jobTitle: memberData.jobTitle || "",
        sectors: memberData.sectors || [],
        needs: memberData.needs || [],
        agreedToTerms: memberData.agreedToTerms || false,
        faydaId: memberData.faydaId || "",
        passportId: memberData.passportId || "",
        kebeleId: memberData.kebeleId || "",
        tinNumber: memberData.tinNumber || ""
      })
    } catch (error) {
      console.error("Failed to fetch member data:", error)
      setError("Failed to load member data")
    } finally {
      setIsLoadingMember(false)
    }
  }

  // Fetch membership levels and member data when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchMembershipLevels()
      if (memberId) {
        fetchMemberData()
      }
    }
  }, [isOpen, memberId])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl font-bold">
            <Edit className="h-6 w-6 text-blue-600" />
            <span>Edit Member</span>
          </DialogTitle>
          <DialogDescription>
            Update member information in the EYEA community
          </DialogDescription>
        </DialogHeader>

        {isLoadingMember ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-2">Loading member data...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <User className="h-5 w-5 text-blue-600" />
                <span>Personal Information</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Birth Date *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="membershipLevel">Membership Level *</Label>
                  <Select value={formData.membershipLevelId} onValueChange={(value) => handleInputChange('membershipLevelId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select membership level" />
                    </SelectTrigger>
                    <SelectContent>
                      {membershipLevels.map((level: any) => (
                        <SelectItem key={level.id} value={level.id.toString()}>
                          {level.name} - ₦{level.price}/{level.frequency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <Building className="h-5 w-5 text-blue-600" />
                <span>Professional Information</span>
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    placeholder="Enter job title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Sectors of Interest</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {sectors.map((sector) => (
                      <div key={sector} className="flex items-center space-x-2">
                        <Checkbox
                          id={`sector-${sector}`}
                          checked={formData.sectors.includes(sector)}
                          onCheckedChange={(checked) => handleSectorChange(sector, checked as boolean)}
                        />
                        <Label htmlFor={`sector-${sector}`} className="text-sm">{sector}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Business Needs</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {needs.map((need) => (
                      <div key={need} className="flex items-center space-x-2">
                        <Checkbox
                          id={`need-${need}`}
                          checked={formData.needs.includes(need)}
                          onCheckedChange={(checked) => handleNeedChange(need, checked as boolean)}
                        />
                        <Label htmlFor={`need-${need}`} className="text-sm">{need}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Documents */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Legal Documents</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="faydaId">Fayda ID</Label>
                  <Input
                    id="faydaId"
                    value={formData.faydaId}
                    onChange={(e) => handleInputChange('faydaId', e.target.value)}
                    placeholder="Enter Fayda ID"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passportId">Passport ID</Label>
                  <Input
                    id="passportId"
                    value={formData.passportId}
                    onChange={(e) => handleInputChange('passportId', e.target.value)}
                    placeholder="Enter Passport ID"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="kebeleId">Kebele ID</Label>
                  <Input
                    id="kebeleId"
                    value={formData.kebeleId}
                    onChange={(e) => handleInputChange('kebeleId', e.target.value)}
                    placeholder="Enter Kebele ID"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tinNumber">TIN Number</Label>
                  <Input
                    id="tinNumber"
                    value={formData.tinNumber}
                    onChange={(e) => handleInputChange('tinNumber', e.target.value)}
                    placeholder="Enter TIN Number"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Member"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
} 