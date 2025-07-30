import { Injectable } from '@nestjs/common';
import { PaginationDto, PaginationResponse } from '../dto/pagination.dto';

@Injectable()
export class PaginationService {
  createPaginationResponse<T>(
    data: T[],
    total: number,
    paginationDto: PaginationDto,
    baseUrl: string = 'http://apieyeamembership.eyea.et'
  ): PaginationResponse<T> {
    const { page = 1, limit = 10 } = paginationDto;
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext,
        hasPrev,
      },
      success: true,
    };
  }

  buildQuery(paginationDto: PaginationDto) {
    const { page = 1, limit = 10, search, sortBy, sortOrder = 'desc' } = paginationDto;
    const skip = (page - 1) * limit;

    let query: any = {};
    let sort: any = { createdAt: sortOrder === 'desc' ? -1 : 1 };

    // Add search functionality
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
        { faydaId: { $regex: search, $options: 'i' } },
      ];
    }

    // Add custom sorting
    if (sortBy) {
      sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
    }

    return {
      query,
      sort,
      skip,
      limit,
    };
  }
} 