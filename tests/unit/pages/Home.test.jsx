import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Home from '../../../src/pages/Home/index';
import axios from 'axios';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useRouteMatch: jest.fn(),
}));

test('renders dashboard content correctly for managed user', async () => {
  require('react-router-dom').useParams.mockReturnValue({ typeOfUser: 'managed' });
  require('react-router-dom').useRouteMatch.mockReturnValue({ url: '/managed' });

  const mockDocumentResponse = {
    data: {
      "record": {
        "data": [
          {
            "id": 1,
            "status": "issued",
            "document_name": "SWAB Test Result",
            "issuer_name": "ISSUER NAME",
            "issuer_logo_url": "https://placehold.co/600x400.png",
            "recipient_name": "John Frusciante",
            "received_on": "2022-01-12T17:58:25.000000Z",
            "expire_at": "2023-01-12T00:00:00.000000Z",
            "created_at": "2022-01-12T10:45:10.000000Z",
            "updated_at": "2022-01-12T17:58:25.000000Z",
            "archived_at": null,
            "deleted_at": null
          },
          {
            "id": 2,
            "status": "approved",
            "document_name": "SWAB Test Result",
            "issuer_name": "ISSUER NAME",
            "issuer_logo_url": "https://placehold.co/600x400.png",
            "recipient_name": "John Frusciante",
            "received_on": null,
            "expire_at": null,
            "created_at": "2022-01-12T10:45:10.000000Z",
            "updated_at": "2022-01-12T17:58:25.000000Z",
            "archived_at": null,
            "deleted_at": null
          }
        ],
        "links": {
          "first": "http://localhost/document-module/identities/1/documents?page=1",
          "last": "http://localhost/document-module/identities/1/documents?page=1",
          "prev": null,
          "next": null
        },
        "meta": {
          "current_page": 1,
          "from": 1,
          "last_page": 1,
          "links": [
            {
              "url": null,
              "label": "pagination.previous",
              "active": false
            },
            {
              "url": "http://localhost/document-module/identities/1/documents?page=1",
              "label": "1",
              "active": true
            },
            {
              "url": null,
              "label": "pagination.next",
              "active": false
            }
          ],
          "path": "http://localhost/document-module/identities/1/documents",
          "per_page": 10,
          "to": 10,
          "total": 2
        }
      },
      "metadata": {
        "id": "66a87a90ad19ca34f88ecd65",
        "private": false,
        "createdAt": "2024-07-30T05:30:56.889Z",
        "name": "Documents"
      }
    }
  };

  const mockCareerGoalResponse = {
    data: {
      "record": {
        "data": [
          {
            "id": 1,
            "name": "Account Manager",
            "description": "Manage maintain and grow the sales and relationships with a specific customer or set of accounts. This includes in-depth customer engagement relationship-building and provision of quality solutions and service to address customers' needs efficiently and generate revenue",
            "category": "Sales and Marketing",
            "type": "technical",
            "progress": 35
          }
        ]
      },
      "metadata": {
        "id": "66a87a3ae41b4d34e4190ccc",
        "private": false,
        "createdAt": "2024-07-30T05:29:30.618Z",
        "name": "Goal"
      }
    }
  }

  const mockUserDataResponse = {
    data: {
      "record": {
        "data": {
          "id": 1,
          "name": "John Smith",
          "email": "john.smith@example.com",
          "profile_picture_url": "https://placehold.co/600x400.png",
          "email_verified_at": "2022-01-01 15:38:33.0 Asia/Singapore (+08:00)",
          "identification_number": "S9****567A",
          "current_organisation": {
            "id": 2,
            "name": "Sample Bank ABC",
            "logo_url": "https://placehold.co/600x400.png",
            "is_personal": false
          }
        }
      },
      "metadata": {
        "id": "66a878a5e41b4d34e4190c12",
        "private": false,
        "createdAt": "2024-07-30T05:22:45.667Z",
        "name": "User"
      }
    }
  }
  axios.get.mockResolvedValueOnce(mockUserDataResponse);
  axios.get.mockResolvedValueOnce(mockDocumentResponse);
  axios.get.mockResolvedValueOnce(mockCareerGoalResponse);

  render(
    <Home />
  );

  const userNameElements = await waitFor(() => screen.getAllByText(/John Smith/i));
  const documentElements = await waitFor(() => screen.getAllByText(/SWAB Test Result/i));

  userNameElements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });

  expect(documentElements).toHaveLength(2);
  documentElements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
  // expect(getByText('Document 2')).toBeInTheDocument();
});

test('renders dashboard content correctly for non-managed user', async () => {
  require('react-router-dom').useParams.mockReturnValue({ typeOfUser: 'personal' });
  require('react-router-dom').useRouteMatch.mockReturnValue({ url: '/personal' });

  const mockDocumentResponse = {
    data: {
      "record": {
        "data": [
          {
            "id": 1,
            "status": "issued",
            "document_name": "SWAB Test Result",
            "issuer_name": "ISSUER NAME",
            "issuer_logo_url": "https://placehold.co/600x400.png",
            "recipient_name": "John Frusciante",
            "received_on": "2022-01-12T17:58:25.000000Z",
            "expire_at": "2023-01-12T00:00:00.000000Z",
            "created_at": "2022-01-12T10:45:10.000000Z",
            "updated_at": "2022-01-12T17:58:25.000000Z",
            "archived_at": null,
            "deleted_at": null
          },
          {
            "id": 2,
            "status": "approved",
            "document_name": "SWAB Test Result",
            "issuer_name": "ISSUER NAME",
            "issuer_logo_url": "https://placehold.co/600x400.png",
            "recipient_name": "John Frusciante",
            "received_on": null,
            "expire_at": null,
            "created_at": "2022-01-12T10:45:10.000000Z",
            "updated_at": "2022-01-12T17:58:25.000000Z",
            "archived_at": null,
            "deleted_at": null
          }
        ],
        "links": {
          "first": "http://localhost/document-module/identities/1/documents?page=1",
          "last": "http://localhost/document-module/identities/1/documents?page=1",
          "prev": null,
          "next": null
        },
        "meta": {
          "current_page": 1,
          "from": 1,
          "last_page": 1,
          "links": [
            {
              "url": null,
              "label": "pagination.previous",
              "active": false
            },
            {
              "url": "http://localhost/document-module/identities/1/documents?page=1",
              "label": "1",
              "active": true
            },
            {
              "url": null,
              "label": "pagination.next",
              "active": false
            }
          ],
          "path": "http://localhost/document-module/identities/1/documents",
          "per_page": 10,
          "to": 10,
          "total": 2
        }
      },
      "metadata": {
        "id": "66a87a90ad19ca34f88ecd65",
        "private": false,
        "createdAt": "2024-07-30T05:30:56.889Z",
        "name": "Documents"
      }
    }
  };

  const mockUserDataResponse = {
    data: {
      "record": {
        "data": {
          "id": 1,
          "name": "John Smith",
          "email": "john.smith@example.com",
          "profile_picture_url": "https://placehold.co/600x400.png",
          "email_verified_at": "2022-01-01 15:38:33.0 Asia/Singapore (+08:00)",
          "identification_number": "S9****567A",
          "current_organisation": {
            "id": 2,
            "name": "Sample Bank ABC",
            "logo_url": "https://placehold.co/600x400.png",
            "is_personal": false
          }
        }
      },
      "metadata": {
        "id": "66a878a5e41b4d34e4190c12",
        "private": false,
        "createdAt": "2024-07-30T05:22:45.667Z",
        "name": "User"
      }
    }
  }
  axios.get.mockResolvedValueOnce(mockUserDataResponse);
  axios.get.mockResolvedValueOnce(mockDocumentResponse);

  render(<Home />);
  const userNameElements = await waitFor(() => screen.getAllByText(/John Smith/i));
  const documentElements = await waitFor(() => screen.getAllByText(/SWAB Test Result/i));

  userNameElements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });

  expect(documentElements).toHaveLength(2);
  documentElements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
});