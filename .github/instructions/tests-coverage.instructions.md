---
applyTo: '**/*.{ts,tsx,js,jsx}'
---

# Testing and Coverage Instructions for SonarQube Quality Gate Compliance

## Critical Requirements

**ALL code changes MUST meet these requirements to pass SonarQube quality gate:**

### Coverage Thresholds (Enforced by SonarQube)
- **Minimum 80% coverage** for:
  - Lines
  - Functions
  - Branches
  - Statements

### When to Write Tests

**ALWAYS write tests when:**
- Adding new components
- Adding new functions or utilities
- Adding new Redux slices or state management
- Modifying existing logic that affects behavior
- Adding new API endpoints or data fetching logic

**Tests are NOT required for:**
- Files explicitly excluded in `vite.config.ts` coverage section
- Pure type definition files (`*.types.ts`)
- Auto-generated API files (`*Api.ts`)
- Theme configuration files
- Static content pages without logic

## Test File Structure

### Naming Convention
- Component tests: `ComponentName.test.tsx`
- Utility tests: `utilityName.test.ts`
- Store tests: `sliceName.test.ts`
- Place test file in the same directory as the source file

### Test Organization Pattern

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ComponentName', () => {
  beforeEach(() => {
    // Setup: Clear mocks, reset state
    vi.clearAllMocks();
  });

  describe('Feature Group 1', () => {
    it('should describe specific behavior', () => {
      // Arrange: Setup test data and conditions
      // Act: Perform the action being tested
      // Assert: Verify expected outcomes
    });
  });

  describe('Feature Group 2', () => {
    it('should describe another behavior', () => {
      // Test implementation
    });
  });
});
```

## Testing Best Practices

### 1. Component Testing
- Test all props variations
- Test conditional rendering paths
- Test user interactions (clicks, typing, form submissions)
- Test error states and edge cases
- Use `screen.getBy*` queries for elements that must exist
- Use `screen.queryBy*` for elements that may not exist

Example:
```typescript
it('should render with required props', () => {
  render(<MyComponent title="Test" />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});

it('should handle optional props', () => {
  render(<MyComponent title="Test" subtitle="Subtitle" />);
  expect(screen.getByText('Subtitle')).toBeInTheDocument();
});

it('should handle user interaction', async () => {
  const onClickMock = vi.fn();
  render(<MyComponent onClick={onClickMock} />);
  await userEvent.click(screen.getByRole('button'));
  expect(onClickMock).toHaveBeenCalledTimes(1);
});
```

### 2. Redux Store Testing
- Test initial state
- Test each action/reducer
- Test selectors
- Mock localStorage when needed
- Test state persistence if applicable

Example:
```typescript
it('should update state on action', () => {
  const initialState = { value: 0 };
  const nextState = reducer(initialState, incrementAction());
  expect(nextState.value).toBe(1);
});
```

### 3. Hook Testing
- Test hook return values
- Test hook state changes
- Test hook side effects
- Use `renderHook` from `@testing-library/react`

### 4. Utility Function Testing
- Test happy path
- Test edge cases (null, undefined, empty strings, etc.)
- Test error handling
- Test boundary conditions

## Coverage Requirements for Code Review

### Before Submitting Code for Review:

1. **Run coverage check locally:**
   ```bash
   pnpm test:coverage
   ```

2. **Verify coverage meets thresholds:**
   - Check that all new/modified files have ≥80% coverage
   - Review the coverage report in `coverage/index.html`

3. **Address coverage gaps:**
   - Identify uncovered lines in the report
   - Add tests for uncovered branches
   - Test error handling paths
   - Test all conditional logic

### Coverage Exclusions

The following are already excluded from coverage requirements (see `vite.config.ts`):
- `setupTests.ts`
- `*.d.ts` (type definitions)
- `*.config.*` (configuration files)
- `**/mockData` (mock data)
- `*Api.ts` (auto-generated API files)
- `*.types.ts` (type-only files)
- Theme showcase and settings pages
- Error pages
- Static content pages
- Complex CRUD pages requiring integration tests
- `main.tsx` (entry point)
- `theme/theme.ts` (theme configuration)

## Code Review Checklist for Tests

When reviewing code changes, verify:

- [ ] Tests exist for all new components and functions
- [ ] Tests cover all branches and conditional logic
- [ ] Tests include edge cases and error scenarios
- [ ] Test descriptions are clear and specific
- [ ] Tests use proper arrange-act-assert pattern
- [ ] Mock functions are properly typed and verified
- [ ] No tests are skipped (no `it.skip` or `describe.skip`)
- [ ] Coverage thresholds are met (≥80% for all metrics)
- [ ] Tests are properly organized with `describe` blocks
- [ ] Tests clean up after themselves (no test pollution)

## Running Tests

### During Development
```bash
pnpm test:watch        # Watch mode for active development
pnpm test              # Run all tests once
pnpm test:coverage     # Run tests with coverage report
```

### Before Committing
```bash
pnpm test:coverage     # Ensure coverage thresholds are met
```

## Common Testing Patterns

### Testing with Redux Store
```typescript
import { renderWithProviders } from '../../test-utils';

it('should interact with Redux store', () => {
  const { store } = renderWithProviders(<Component />);
  // Test component with real store
  expect(store.getState().someSlice.value).toBe(expected);
});
```

### Testing Async Operations
```typescript
it('should handle async data loading', async () => {
  render(<Component />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});
```

### Testing Form Interactions
```typescript
it('should submit form with valid data', async () => {
  const onSubmit = vi.fn();
  render(<FormComponent onSubmit={onSubmit} />);
  
  await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
  await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
  
  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith({ name: 'John Doe' });
  });
});
```

## SonarQube Quality Gate

The build pipeline includes:
1. SonarQube scan action
2. Quality gate check (enforces coverage thresholds)
3. Build fails if quality gate criteria are not met

**To pass SonarQube quality gate:**
- Ensure test coverage meets all 80% thresholds
- Write meaningful tests that actually verify behavior
- Avoid writing tests just to increase coverage numbers
- Test realistic use cases and edge conditions

## Additional Resources

- Vitest Documentation: https://vitest.dev/
- Testing Library: https://testing-library.com/
- Test file examples in `src/components/SampleComponent/` and `src/store/themeSlice.test.ts`
