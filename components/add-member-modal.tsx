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
import { Loader2, User, Mail, Phone, Calendar, MapPin, Building, Plus, X } from "lucide-react"
import { apiClient } from "@/lib/api"

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
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

export function AddMemberModal({ isOpen, onClose, onSuccess }: AddMemberModalProps) {
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
    if (!formData.agreedToTerms) return "You must agree to the terms"
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
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

      // Call API to register member
      await apiClient.registerMembership(memberData)
      
      // Reset form
      setFormData({
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
      
      onSuccess()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add member")
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

  // Fetch membership levels when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchMembershipLevels()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl font-bold">
            <Plus className="h-6 w-6 text-blue-600" />
            <span>Add New Member</span>
          </DialogTitle>
          <DialogDescription>
            Register a new member to the EYEA community
          </DialogDescription>
        </DialogHeader>

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
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  placeholder="Enter job title"
                />
              </div>
            </div>
          </div>

          {/* Membership Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <Building className="h-5 w-5 text-green-600" />
              <span>Membership Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="membershipLevel">Membership Level *</Label>
                <Select value={formData.membershipLevelId} onValueChange={(value) => handleInputChange('membershipLevelId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select membership level" />
                  </SelectTrigger>
                  <SelectContent>
                    {membershipLevels.map((level: any) => (
                      <SelectItem key={level.id} value={level.id.toString()}>
                        {level.name} - {level.price} ETB/{level.frequency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Sectors */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Business Sectors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {sectors.map((sector) => (
                <div key={sector} className="flex items-center space-x-2">
                  <Checkbox
                    id={sector}
                    checked={formData.sectors.includes(sector)}
                    onCheckedChange={(checked) => handleSectorChange(sector, checked as boolean)}
                  />
                  <Label htmlFor={sector} className="text-sm">{sector}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Needs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Support Needs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {needs.map((need) => (
                <div key={need} className="flex items-center space-x-2">
                  <Checkbox
                    id={need}
                    checked={formData.needs.includes(need)}
                    onCheckedChange={(checked) => handleNeedChange(need, checked as boolean)}
                  />
                  <Label htmlFor={need} className="text-sm">{need}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              <span>Legal Information</span>
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

          {/* Terms Agreement */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreedToTerms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) => handleInputChange('agreedToTerms', checked)}
                required
              />
              <Label htmlFor="agreedToTerms" className="text-sm">
                I agree to the terms and conditions of EYEA membership *
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding Member...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 